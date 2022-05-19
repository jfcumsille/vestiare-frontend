import { vi } from 'vitest';

export const mockCrypto = () => {
  const oldCrypto = window.crypto;
  window.crypto = {
    subtle: {
      digest: vi.fn(),
      decrypt: vi.fn(),
      deriveBits: vi.fn(),
      deriveKey: vi.fn(),
      encrypt: vi.fn(),
      exportKey: vi.fn() as any,
      generateKey: vi.fn() as any,
      importKey: vi.fn() as any,
      sign: vi.fn(),
      unwrapKey: vi.fn(),
      verify: vi.fn(),
      wrapKey: vi.fn(),
    },
    getRandomValues: vi.fn(),
    randomUUID: vi.fn(),
  };

  return {
    restore: () => { window.crypto = oldCrypto; },
  };
};
