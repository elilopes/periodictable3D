declare module 'gifenc' {
  export interface GIFEncoderOptions {
    auto?: boolean;
    initialCapacity?: number;
  }

  export interface WriteFrameOptions {
    palette?: number[][];
    delay?: number;
    transparent?: boolean;
    transparentIndex?: number;
    dispose?: number;
  }

  export interface GIFEncoderInstance {
    writeFrame: (index: Uint8Array, width: number, height: number, options?: WriteFrameOptions) => void;
    finish: () => void;
    bytes: () => Uint8Array;
    reset: () => void;
  }

  export function GIFEncoder(options?: GIFEncoderOptions): GIFEncoderInstance;
  export function quantize(data: Uint8ClampedArray | number[], maxColors?: number, options?: any): number[][];
  export function applyPalette(data: Uint8ClampedArray | number[], palette: number[][], format?: string): Uint8Array;
}
