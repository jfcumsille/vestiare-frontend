<script setup lang="ts">
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useOrganizationStore } from '@/stores/organization';
import { useTranslation } from '@/locales';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import { Status, Role, OrganizationRole } from '@/interfaces/utilities/enums';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';
import TableDate from '@/components/table/utils/TableDate.vue';
import GenericBadge from '@/components/GenericBadge.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';

const props = defineProps<{
  member: OrganizationUser
}>();

const $t = useTranslation('views.organization.members');
const organizationStore = useOrganizationStore();

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

const roleOptions = [{ value: Role.Admin, label: $t('admin') }, { value: Role.Member, label: $t('member') }];
const selectRole = (value: string) => {
  const data = { role: value as Role };
  organizationStore.updateOrganizationUser(props.member, data);
};

const organizationRoleOptions = [
  { value: OrganizationRole.FinanceManagement, label: $t('financeManagement') },
  { value: OrganizationRole.Developer, label: $t('developer') },
  { value: OrganizationRole.Operations, label: $t('operations') },
  { value: OrganizationRole.Other, label: $t('other') },
];
const selectOrganizationRole = (value: string) => {
  const data = { organizationRole: value as OrganizationRole };
  organizationStore.updateOrganizationUser(props.member, data);
};
const preselectedOrganizationRole = computed(() => {
  const role = props.member.organizationRole;
  return organizationRoleOptions.find((option) => option.value === role)?.label || '------';
});

const showUserOptions = ref(false);
const toggleShowUserOptions = () => { showUserOptions.value = !showUserOptions.value; };
const userOptions = ref(null);
onClickOutside(userOptions, () => {
  showUserOptions.value = false;
});

const handleDelete = () => organizationStore.deleteOrganizationUser(props.member);
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
      <GenericDropDown
        :options="organizationRoleOptions"
        :selected="preselectedOrganizationRole"
        capitalize-options
        inline
        @select="selectOrganizationRole"
      />
    </TableData>
    <TableData>
      <GenericDropDown
        :options="roleOptions"
        :selected="$t(props.member.role)"
        capitalize-options
        inline
        @select="selectRole"
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
    <TableData>
      <div ref="userOptions">
        <ThreeDots
          class="cursor-pointer h-6 pr-1 w-6"
          @click="toggleShowUserOptions"
        />
        <div
          v-if="showUserOptions"
          class="
            absolute right-50 px-4 py-3
            bg-white rounded-lg border border-light-gray drop-shadow-md
          "
        >
          <button
            data-test="delete-key-button"
            class="text-primary-main hover:text-primary-hover"
            @click="handleDelete"
          >
            {{ $t('delete') }}
          </button>
        </div>
      </div>
    </TableData>
  </TableRow>
</template>
