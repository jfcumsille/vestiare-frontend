declare global {
  interface Window {
    hj: any
    _hjSettings: any
  }
}

// Hotjar Tracking Code for https://dashboard.fintoc.com/
function trackingFunc(h: Window, o: Document, t: string, j: string, a?: HTMLElement, r?: HTMLScriptElement) {
  h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments); };
  h._hjSettings = { hjid: 2933858, hjsv: 6 };
  a = o.getElementsByTagName('head')[0];
  r = o.createElement('script'); r.async = true;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
}

function start() {
  trackingFunc(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
}

function isAPIAvailable() {
  return !!window.hj;
}

function sendEvent(event: string) {
  window.hj('event', event);
}

export default {
  start,
  sendEvent,
  isAPIAvailable,
};
