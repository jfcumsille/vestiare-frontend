import { Organization } from './organizations';

export interface User {
  authenticationToken: string
  id: string
  email: string
  name: string
  lastName: string
  organizations: Array<Organization>
  defaultOrganizationId: string
}
