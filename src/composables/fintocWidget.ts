// This file is basically https://github.com/fintoc-com/fintoc-js,
// changing the widget URL depending on the dashboard env.

import { FINTOC_WIDGET_URL } from '@/constants/api';
import { Fintoc } from '@/interfaces/utilities/widget';

export const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    `script[src^="${FINTOC_WIDGET_URL}"]`,
  );

  return Array.from(scripts).find((script) => FINTOC_WIDGET_URL === script.src) || null;
};

export const injectScript = (): HTMLScriptElement => {
  const script = document.createElement('script');
  script.src = FINTOC_WIDGET_URL;

  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Expected document.head or document.body not to be null.');
  }

  headOrBody.appendChild(script);

  return script;
};

const findScriptBehindShim = (): HTMLScriptElement | null => {
  const scripts = document.getElementsByTagName('script');
  return Array.from(scripts).find((script) => script.src.includes('wizard-script')) || null;
};

let fintocPromise: Promise<Fintoc | null> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkIfFintocIsAvailable = (resolve: any): void => {
  if (window.Fintoc) {
    resolve(window.Fintoc);
  }
};

export const useFintocWidget = (): Promise<Fintoc | null> => {
  if (fintocPromise !== null) {
    return fintocPromise;
  }

  fintocPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Imports on server side will get a null
      // Fintoc object instead of failing
      resolve(null);
      return;
    }

    if (window.Fintoc) {
      resolve(window.Fintoc);
      return;
    }

    try {
      const script = findScript() || injectScript();
      script.addEventListener('load', () => {
        checkIfFintocIsAvailable(resolve);
      });
      script.addEventListener('error', () => {
        reject(new Error('Failed to load Fintoc.js'));
      });
      if (!window.Fintoc) {
        script.addEventListener('load', () => {
          const scriptBehindShim = findScriptBehindShim();
          scriptBehindShim?.addEventListener('load', () => {
            checkIfFintocIsAvailable(resolve);
            if (!window.Fintoc) {
              reject(new Error('Fintoc.js is not available'));
            }
          });
          scriptBehindShim?.addEventListener('error', () => {
            reject(new Error('Failed to load Fintoc.js'));
          });
        });
      }
    } catch (error) {
      reject(error);
    }
  });

  return fintocPromise;
};
