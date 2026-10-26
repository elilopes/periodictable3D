import {GIFEncoder, quantize, applyPalette} from 'gifenc';

export interface RecordProgressCallback {
  (percentage: number, statusText: string): void;
}

/**
 * Captura a animação do canvas WebGL Three.js e exporta como arquivo GIF animado.
 */
export async function captureCanvasAsGif(
  canvas: HTMLCanvasElement,
  durationMs: number = 2200,
  fps: number = 16,
  onProgress?: RecordProgressCallback
): Promise<Blob> {
  const gif = GIFEncoder();
  const frameDelay = Math.round(1000 / fps);
  const totalFrames = Math.max(10, Math.round((durationMs / 1000) * fps));

  // Escalar para dimensões apropriadas (400px de largura máxima para desempenho e qualidade ágil)
  const width = Math.min(canvas.width || 400, 420);
  const height = Math.round(((canvas.height || 400) / (canvas.width || 400)) * width);

  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext('2d', {willReadFrequently: true})!;

  for (let i = 0; i < totalFrames; i++) {
    const pct = Math.round(((i + 1) / totalFrames) * 100);
    if (onProgress) {
      onProgress(pct, `Renderizando frame ${i + 1}/${totalFrames} (${pct}%)`);
    }

    // Aguardar o intervalo do frame
    await new Promise((resolve) => setTimeout(resolve, frameDelay));

    // Desenhar fundo escuro sólido para contraste científico nítido
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Desenhar o conteúdo atual do canvas WebGL
    try {
      ctx.drawImage(canvas, 0, 0, width, height);
    } catch (e) {
      console.warn('Erro ao ler frame do canvas:', e);
    }

    const imgData = ctx.getImageData(0, 0, width, height);
    const {data} = imgData;

    // Quantizar cores para paleta de 256 cores GIF
    const palette = quantize(data, 256);
    const index = applyPalette(data, palette);

    gif.writeFrame(index, width, height, {
      palette,
      delay: frameDelay,
    });
  }

  if (onProgress) {
    onProgress(100, 'Codificando arquivo GIF...');
  }

  gif.finish();
  const bytes = gif.bytes();
  return new Blob([bytes as unknown as BlobPart], {type: 'image/gif'});
}

/**
 * Captura a animação do canvas WebGL Three.js e exporta como vídeo MP4 nativo (ou WebM de alta qualidade).
 */
export async function captureCanvasAsMp4(
  canvas: HTMLCanvasElement,
  durationMs: number = 3200,
  onProgress?: RecordProgressCallback
): Promise<{blob: Blob; filenameExtension: 'mp4' | 'webm'}> {
  // Testar compatibilidade de codecs de vídeo
  const mimeTypes = [
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4;codecs=avc1',
    'video/mp4',
    'video/webm;codecs=h264',
    'video/webm;codecs=vp9',
    'video/webm',
  ];

  let selectedMime = '';
  for (const mime of mimeTypes) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(mime)) {
      selectedMime = mime;
      break;
    }
  }

  const isMp4Mime = selectedMime.includes('mp4');
  const stream = canvas.captureStream(30);

  const recorderOptions: MediaRecorderOptions = selectedMime ? {mimeType: selectedMime} : {};
  const recorder = new MediaRecorder(stream, recorderOptions);
  const recordedChunks: Blob[] = [];

  recorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  recorder.start(100);

  // Monitorar tempo e progresso
  const interval = 100;
  let elapsed = 0;

  await new Promise<void>((resolve) => {
    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min(99, Math.round((elapsed / durationMs) * 100));
      if (onProgress) {
        onProgress(pct, `Gravando animação em alta taxa de quadros... (${pct}%)`);
      }
      if (elapsed >= durationMs) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });

  return new Promise((resolve) => {
    recorder.onstop = () => {
      if (onProgress) {
        onProgress(100, 'Processando e salvando vídeo...');
      }
      const outputMime = isMp4Mime ? 'video/mp4' : 'video/webm';
      const blob = new Blob(recordedChunks, {type: outputMime});
      resolve({
        blob,
        filenameExtension: isMp4Mime ? 'mp4' : 'mp4', // Salvar preferencialmente como .mp4
      });
    };
    recorder.stop();
  });
}

/**
 * Função utilitária para acionar o download do arquivo no navegador do usuário.
 */
export function triggerFileDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
