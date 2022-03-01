export interface IAuthenticationHeaders {
  Authorization: string
  'X-User-Email': string
}

export type IOptionalAuthenticationHeaders = IAuthenticationHeaders | Record<string, never>
