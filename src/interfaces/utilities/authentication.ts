export interface AuthenticationHeaders {
  Authorization: string
  'X-User-Email': string
}

export type OptionalAuthenticationHeaders = AuthenticationHeaders | Record<string, never>
