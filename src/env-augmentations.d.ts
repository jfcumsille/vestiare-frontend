import type { Fintoc } from '@/interfaces/utilities/widget';

declare global {
  interface Crypto {
    randomUUID: () => string;
  }

  interface Window {
    Fintoc?: Fintoc;
  }
}

export {};
