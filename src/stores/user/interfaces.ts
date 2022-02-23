export interface LogInOptions {
  email: string
  password: string
  token: string
}

export interface AuthenticationHeaders {
  Authorization: string
  'X-User-Email': string
}

export type OptionalAuthenticationHeaders = AuthenticationHeaders | Record<string, never>
