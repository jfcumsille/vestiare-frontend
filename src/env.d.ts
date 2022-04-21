/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_BASE_API_HOST?: string
  readonly VITE_AUTH0_DOMAIN?: string
  readonly VITE_AUTH0_CLIENT_ID?: string
  readonly VITE_SEGMENT_WRITE_KEY?: string
  readonly VITE_HOTJAR_ORGANIZATION_IDS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
