import React, {useState, useEffect, useRef} from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {ElementData} from '../data/elements';
import {BohrAtom, BohrLegend} from './BohrAtom';
import {QuantumOrbitalModel} from './QuantumOrbitalModel';
import {BallAndStickModel} from './BallAndStickModel';
import {SpaceFillingModel} from './SpaceFillingModel';
import {VisualElementsArtView} from './VisualElementsArtView';
import {useLanguage} from '../i18n/LanguageContext';
import {
  captureCanvasAsGif,
  captureCanvasAsMp4,
  triggerFileDownload,
} from '../utils/atomicAnimationRecorder';
import {
  Atom,
  Sparkles,
  Share2,
  CircleDot,
  RotateCw,
  Info,
  Layers,
  Palette,
  Maximize2,
  Minimize2,
  Download,
  Film,
  Video,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export type AtomicModelType =
  | 'rutherford-bohr'
  | 'quantum-orbital'
  | 'ball-and-stick'
  | 'space-filling'
  | 'visual-elements';

interface AtomicModelViewerProps {
  element: ElementData;
}

// Componente auxiliar para capturar a referência do elemento Canvas WebGL nativo
function CanvasDomBinder({onReady}: {onReady: (canvas: HTMLCanvasElement) => void}) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    if (gl && gl.domElement) {
      onReady(gl.domElement);
    }
  }, [gl, onReady]);
  return null;
}

export function AtomicModelViewer({element}: AtomicModelViewerProps) {
  const {t, language} = useLanguage();
  const [activeModel, setActiveModel] = useState<AtomicModelType>('rutherford-bohr');
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [showTrails, setShowTrails] = useState<boolean>(true);

  // Estados de tela cheia
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito para fechar tela cheia com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);


  // Referência ao canvas WebGL ativo
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);

  // Estados de exportação de gravação (GIF e MP4)
  const [isRecordingGif, setIsRecordingGif] = useState<boolean>(false);
  const [isRecordingMp4, setIsRecordingMp4] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Modelos configurados com ícones
  const modelOptions: Array<{
    id: AtomicModelType;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'rutherford-bohr',
      label: t.models.rutherfordBohr.shortName,
      icon: <Atom className="w-3.5 h-3.5" />,
    },
    {
      id: 'quantum-orbital',
      label: t.models.quantumOrbital.shortName,
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: 'ball-and-stick',
      label: t.models.ballAndStick.shortName,
      icon: <Share2 className="w-3.5 h-3.5" />,
    },
    {
      id: 'space-filling',
      label: t.models.spaceFilling.shortName,
      icon: <CircleDot className="w-3.5 h-3.5" />,
    },
    {
      id: 'visual-elements',
      label: language === 'pt' ? 'Visual Elements' : language === 'ru' ? 'Visual Elements (RSC)' : 'Visual Elements',
      icon: <Palette className="w-3.5 h-3.5" />,
    },
  ];

  // Informações do modelo ativo
  const activeModelInfo = (() => {
    switch (activeModel) {
      case 'rutherford-bohr':
        return t.models.rutherfordBohr;
      case 'quantum-orbital':
        return t.models.quantumOrbital;
      case 'ball-and-stick':
        return t.models.ballAndStick;
      case 'space-filling':
        return t.models.spaceFilling;
      case 'visual-elements':
        return {
          title: 'Murray Robertson’s Visual Elements (Royal Society of Chemistry)',
          badge: 'Arte & Ciência RSC',
          desc:
            language === 'pt'
              ? 'Representação artística e histórica de cada elemento químico criada pelo aclamado artista Murray Robertson para a Royal Society of Chemistry (RSC). Cada elemento possui uma gravura digital exclusiva que combina ciência moderna, história e simbolismo visual.'
              : language === 'ru'
              ? 'Художественное и историческое представление каждого элемента, созданное художником Мюрреем Робертсоном для Королевского химического общества Великобритании (RSC).'
              : 'Artistic and historical interpretation of each chemical element created by artist Murray Robertson for the Royal Society of Chemistry (RSC).',
        };
    }
  })();

  // Handler para gravação e download de GIF animado
  const handleDownloadGif = async () => {
    if (!canvasElement || isRecordingGif || isRecordingMp4) return;
    setIsRecordingGif(true);
    setRecordProgress(0);
    setStatusMessage('Iniciando gravação de GIF...');

    try {
      const blob = await captureCanvasAsGif(
        canvasElement,
        2200,
        15,
        (pct, text) => {
          setRecordProgress(pct);
          setStatusMessage(text);
        }
      );

      const fileName = `${element.name}_${element.symbol}_${activeModel}_3D.gif`.replace(/\s+/g, '_');
      triggerFileDownload(blob, fileName);
      setStatusMessage('GIF baixado com sucesso!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error('Erro ao gerar GIF:', err);
      setStatusMessage('Erro ao gerar GIF animado.');
    } finally {
      setIsRecordingGif(false);
    }
  };

  // Handler para gravação e download de vídeo MP4
  const handleDownloadMp4 = async () => {
    if (!canvasElement || isRecordingGif || isRecordingMp4) return;
    setIsRecordingMp4(true);
    setRecordProgress(0);
    setStatusMessage('Iniciando gravação de vídeo MP4...');

    try {
      const {blob, filenameExtension} = await captureCanvasAsMp4(
        canvasElement,
        3200,
        (pct, text) => {
          setRecordProgress(pct);
          setStatusMessage(text);
        }
      );

      const fileName = `${element.name}_${element.symbol}_${activeModel}_3D.${filenameExtension}`.replace(/\s+/g, '_');
      triggerFileDownload(blob, fileName);
      setStatusMessage('Vídeo MP4 baixado com sucesso!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      console.error('Erro ao gerar MP4:', err);
      setStatusMessage('Erro ao gravar vídeo MP4.');
    } finally {
      setIsRecordingMp4(false);
    }
  };

  // Renderizador do Canvas 3D
  const render3DCanvas = (isBig: boolean = false) => (
    <Canvas
      gl={{preserveDrawingBuffer: true, antialias: true, alpha: true}}
      camera={{position: [0, 0, isBig ? 8.5 : 7.5], fov: 46}}
    >
      <CanvasDomBinder onReady={(canvas) => setCanvasElement(canvas)} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 0, 6]} intensity={1.0} />

      {activeModel === 'rutherford-bohr' && (
        <BohrAtom element={element} speed={rotationSpeed} showTrails={showTrails} />
      )}

      {activeModel === 'quantum-orbital' && <QuantumOrbitalModel element={element} />}

      {activeModel === 'ball-and-stick' && <BallAndStickModel element={element} />}

      {activeModel === 'space-filling' && <SpaceFillingModel element={element} />}

      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        minDistance={2.5}
        maxDistance={22}
        makeDefault
      />
    </Canvas>
  );

  return (
    <div className="flex flex-col gap-3" ref={containerRef}>
      {/* Seletor dos Modelos de Visualização Atômica */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            {t.models.modelSelectorLabel}
          </span>
          <span className="text-[10px] text-sky-400 font-mono">
            {activeModelInfo.badge}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {modelOptions.map((opt) => {
            const isSelected = opt.id === activeModel;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveModel(opt.id)}
                className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400/60 text-sky-300 shadow-md font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {opt.icon}
                <span className="truncate">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Barra de Ações: Tela Cheia & Download de GIF e MP4 */}
      <div className="flex items-center justify-between gap-1.5 bg-slate-950/70 p-2 rounded-xl border border-slate-800 text-xs">
        <button
          onClick={() => setIsFullscreen(true)}
          className="flex-1 py-1.5 px-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 font-semibold flex items-center justify-center gap-1.5 transition"
          title="Ver Modelo Atômico 3D em Tela Cheia"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Tela Cheia</span>
        </button>

        {activeModel !== 'visual-elements' && (
          <>
            <button
              onClick={handleDownloadGif}
              disabled={isRecordingGif || isRecordingMp4}
              className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
              title="Baixar Animação 3D em GIF"
            >
              {isRecordingGif ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
              ) : (
                <Film className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>GIF</span>
            </button>

            <button
              onClick={handleDownloadMp4}
              disabled={isRecordingGif || isRecordingMp4}
              className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
              title="Baixar Animação 3D em MP4"
            >
              {isRecordingMp4 ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
              ) : (
                <Video className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span>MP4</span>
            </button>
          </>
        )}
      </div>

      {/* Indicador de Progresso de Gravação */}
      {(isRecordingGif || isRecordingMp4 || statusMessage) && (
        <div className="p-2.5 bg-slate-900 border border-sky-500/40 rounded-xl text-xs flex flex-col gap-1.5 animate-fadeIn">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              {isRecordingGif || isRecordingMp4 ? (
                <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
              {statusMessage}
            </span>
            {(isRecordingGif || isRecordingMp4) && (
              <span className="font-mono text-sky-400 font-bold">{recordProgress}%</span>
            )}
          </div>
          {(isRecordingGif || isRecordingMp4) && (
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full transition-all duration-150"
                style={{width: `${recordProgress}%`}}
              />
            </div>
          )}
        </div>
      )}

      {/* Área Central: Visualizador 3D ou Visual Elements Artwork */}
      <div
        className="w-full h-72 bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800/80 relative shadow-inner select-none touch-none flex items-center justify-center"
        style={{touchAction: 'none'}}
      >
        {activeModel === 'visual-elements' ? (
          <VisualElementsArtView element={element} />
        ) : (
          render3DCanvas(false)
        )}

        {/* Controles sobrepostos específicos para o modelo Rutherford-Bohr */}
        {activeModel === 'rutherford-bohr' && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-300 pointer-events-auto">
            <button
              onClick={() => setShowTrails(!showTrails)}
              className={`px-2 py-0.5 rounded text-[10px] ${
                showTrails ? 'bg-sky-500/20 text-sky-300' : 'text-slate-500'
              }`}
            >
              {t.sidebar.orbitsToggle}
            </button>
            <button
              onClick={() => setRotationSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
              className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] hover:text-white"
            >
              {rotationSpeed}x
            </button>
          </div>
        )}

        {/* Dica de Rotação com o Mouse ou Dedo */}
        {activeModel !== 'visual-elements' && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-300 pointer-events-none">
            <RotateCw className="w-3 h-3 text-sky-400 animate-spin" style={{animationDuration: '8s'}} />
            <span>{t.models.rotateInstruction}</span>
          </div>
        )}
      </div>

      {/* Seção Informativa do Modelo Selecionado */}
      <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800 text-xs text-slate-300 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sky-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            {activeModelInfo.title}
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">{activeModelInfo.desc}</p>
        {'uncertaintyPrinciple' in activeModelInfo && Boolean((activeModelInfo as any).uncertaintyPrinciple) && (
          <div className="mt-1 p-2 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300">
            <strong>{String((activeModelInfo as any).uncertaintyPrinciple)}</strong>
          </div>
        )}
        {'geometryNote' in activeModelInfo && Boolean((activeModelInfo as any).geometryNote) && (
          <div className="mt-1 p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300">
            {String((activeModelInfo as any).geometryNote)}
          </div>
        )}
        {'vanDerWaalsRadius' in activeModelInfo && Boolean((activeModelInfo as any).vanDerWaalsRadius) && (
          <div className="mt-1 p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-300">
            {String((activeModelInfo as any).vanDerWaalsRadius)}
          </div>
        )}
      </div>

      {/* Legenda de Camadas do Bohr */}
      {activeModel === 'rutherford-bohr' && <BohrLegend element={element} />}

      {/* MODAL IMERSIVO DE TELA CHEIA (FULLSCREEN 3D ATOMIC VIEWER) */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none">
          {/* Header da Tela Cheia */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-sm border border-sky-500/30">
                {element.symbol}
              </span>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {element.name} ({element.symbol}) - Z = {element.number}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {activeModelInfo.badge}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">{activeModelInfo.title}</p>
              </div>
            </div>

            {/* Ações da Tela Cheia: Modelos, Gravação e Fechar */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                {modelOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveModel(opt.id)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      activeModel === opt.id
                        ? 'bg-sky-500 text-white shadow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>

              {activeModel !== 'visual-elements' && (
                <>
                  <button
                    onClick={handleDownloadGif}
                    disabled={isRecordingGif || isRecordingMp4}
                    className="py-2 px-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
                  >
                    {isRecordingGif ? <Loader2 className="w-4 h-4 animate-spin" /> : <Film className="w-4 h-4" />}
                    <span>Baixar GIF</span>
                  </button>

                  <button
                    onClick={handleDownloadMp4}
                    disabled={isRecordingGif || isRecordingMp4}
                    className="py-2 px-3.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
                  >
                    {isRecordingMp4 ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                    <span>Baixar MP4</span>
                  </button>
                </>
              )}

              <button
                onClick={() => setIsFullscreen(false)}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                title="Sair da Tela Cheia"
              >
                <Minimize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Sair da Tela Cheia</span>
              </button>
            </div>
          </div>

          {/* Seletor Mobile de Modelos */}
          <div className="flex md:hidden items-center gap-1 p-2 bg-slate-900 border-b border-slate-800 overflow-x-auto">
            {modelOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveModel(opt.id)}
                className={`py-1 px-2.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
                  activeModel === opt.id ? 'bg-sky-500 text-white' : 'text-slate-400 bg-slate-800'
                }`}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Área 3D em Tela Cheia */}
          <div className="flex-1 relative bg-slate-950 overflow-hidden flex items-center justify-center">
            {activeModel === 'visual-elements' ? (
              <div className="w-full h-full p-8 flex items-center justify-center">
                <div className="max-w-2xl max-h-full">
                  <VisualElementsArtView element={element} />
                </div>
              </div>
            ) : (
              render3DCanvas(true)
            )}

            {/* Controles de velocidade na tela cheia */}
            {activeModel === 'rutherford-bohr' && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setShowTrails(!showTrails)}
                  className={`px-2.5 py-1 rounded-lg ${
                    showTrails ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-slate-400'
                  }`}
                >
                  {t.sidebar.orbitsToggle}
                </button>
                <button
                  onClick={() => setRotationSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
                >
                  {rotationSpeed}x
                </button>
              </div>
            )}

            {/* Dica inferior de rotação */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 pointer-events-none">
              <RotateCw className="w-4 h-4 text-sky-400 animate-spin" style={{animationDuration: '8s'}} />
              <span>Gire com o mouse ou dedo • Role para dar zoom</span>
            </div>

            {/* Feedback de gravação em tela cheia */}
            {(isRecordingGif || isRecordingMp4 || statusMessage) && (
              <div className="absolute bottom-6 right-6 z-20 p-4 bg-slate-900/95 border border-sky-500/50 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col gap-2 min-w-[280px]">
                <div className="flex items-center justify-between text-xs text-white font-bold">
                  <span>{statusMessage}</span>
                  {(isRecordingGif || isRecordingMp4) && (
                    <span className="text-sky-400">{recordProgress}%</span>
                  )}
                </div>
                {(isRecordingGif || isRecordingMp4) && (
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full transition-all duration-150"
                      style={{width: `${recordProgress}%`}}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
