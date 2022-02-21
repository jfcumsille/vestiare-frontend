import { Organization } from './organizations';

export interface LogInResponse {
  authenticationToken: string
  id: string
  email: string
  name: string
  lastName: string
  organizations: Array<Organization>
  defaultOrganizationId: string
}
