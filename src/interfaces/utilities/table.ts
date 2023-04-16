export interface FilterOption<T> {
  name: string,
  value: T,
  checked: boolean,
}

export interface Filter<T> {
  label: string,
  values: Array<FilterOption<T>>,
  open: boolean,
}

export interface DressFilter {
  public?: Array<boolean>,
}
