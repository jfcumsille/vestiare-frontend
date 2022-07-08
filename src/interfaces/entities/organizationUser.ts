import { OrganizationRole, Role, Status } from '@/interfaces/utilities/enums';

export interface OrganizationUser {
  id: string,
  name: string,
  email: string,
  organizationRole: OrganizationRole,
  role: Role,
  status: Status,
  createdAt: string
}
