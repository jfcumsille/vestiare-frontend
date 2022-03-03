export interface APIKey {
  id: string
  token: string
  isPublic: boolean
  mode: 'live' | 'test'
}
