export interface OAuthToken {
  accessToken: string
  idToken: string
  scope: string
  tokenType: string
  expiresIn: number
}
