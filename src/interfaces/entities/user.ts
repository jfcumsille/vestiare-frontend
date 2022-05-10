import { Organization } from './organizations';

export interface User {
  id: string
  email: string
  name: string
  lastName: string
  organizations: Array<Organization>
  defaultOrganizationId: string
}

export interface Auth0User {
  Id: string
  email: string
  givenName: string
  familyName: string
  emailVerified: boolean
  userMetadata: Record<string, unknown>
}
