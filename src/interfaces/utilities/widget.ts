// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FintocWidgetOptions = Record<string, any>;

export interface FintocWidget {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

export interface Fintoc {
  create: (options: FintocWidgetOptions) => FintocWidget;
}
