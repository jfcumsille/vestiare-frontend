<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import { Status } from '@/interfaces/utilities/enums';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';
import TableDate from '@/components/table/utils/TableDate.vue';
import GenericBadge from '@/components/GenericBadge.vue';

const props = defineProps<{
  member: OrganizationUser
}>();

const $t = useTranslation('views.organization.members');

const name = computed(() => (props.member.name.includes('pending-name') ? '------' : props.member.name));
const status = computed(() => {
  switch (props.member.status) {
    case Status.Accepted:
      return $t('accepted');
    case Status.InvitationSent:
      return $t('invitationSent');
    case Status.Rejected:
      return $t('rejected');
    default:
      return $t('rejected');
  }
});
const statusBadgeColor = computed(() => {
  switch (props.member.status) {
    case Status.Accepted:
      return 'green';
    case Status.InvitationSent:
      return 'orange';
    case Status.Rejected:
      return 'red';
    default:
      return 'red';
  }
});

</script>
<template>
  <TableRow>
    <TableData class="max-w-xs">
      <TableLabel
        :label="name"
      />
    </TableData>
    <TableData>
      <TableLabel
        :sub-label="props.member.email"
      />
    </TableData>
    <TableData>
      <TableLabel
        :sub-label="props.member.organizationRole || '------'"
      />
    </TableData>
    <TableData>
      <TableLabel
        :sub-label="$t(props.member.role)"
      />
    </TableData>
    <TableData>
      <TableDate
        :date-string="props.member.createdAt"
      />
    </TableData>

    <TableData>
      <GenericBadge
        :text="status"
        :color="statusBadgeColor"
      />
    </TableData>
  </TableRow>
</template>
