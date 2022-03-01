import { IOrganization } from './organizations';

export interface IUser {
  authenticationToken: string
  id: string
  email: string
  name: string
  lastName: string
  organizations: Array<IOrganization>
  defaultOrganizationId: string
}
