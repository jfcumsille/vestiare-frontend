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

let fintocPromise: Promise<Fintoc | null> | null = null;

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
      let script = findScript();

      if (!script) {
        script = injectScript();
      }

      script.addEventListener('load', () => {
        if (window.Fintoc) {
          resolve(window.Fintoc);
        } else {
          reject(new Error('Fintoc.js is not available'));
        }
      });

      script.addEventListener('error', () => {
        reject(new Error('Failed to load Fintoc.js'));
      });
    } catch (error) {
      reject(error);
    }
  });

  return fintocPromise;
};
