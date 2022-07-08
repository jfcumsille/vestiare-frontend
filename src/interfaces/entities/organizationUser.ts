import { OrganizationRole, Role, Status } from '@/interfaces/utilities/enums';

export interface OrganizationUser {
  name: string
  email: string
  organizationRole: OrganizationRole,
  role: Role,
  status: Status,
  createdAt: string
}
