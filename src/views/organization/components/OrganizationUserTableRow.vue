<script setup lang="ts">
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useOrganizationStore } from '@/stores/organization';
import { useUserStore } from '@/stores/user';
import { useTranslation } from '@/locales';
import { OrganizationUser } from '@/interfaces/entities/organizationUser';
import {
  Status,
  Role,
  OrganizationRole,
  ButtonType,
  SizeType,
} from '@/interfaces/utilities/enums';
import { USER_REMOVED_ORG } from '@/constants/analyticsEvents';
import { trackModal, trackId } from '@/services/analytics';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';
import TableDate from '@/components/table/utils/TableDate.vue';
import GenericBadge from '@/components/GenericBadge.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import GenericButton from '@/components/GenericButton.vue';
import AlertModal from '@/components/AlertModal.vue';

const props = defineProps<{
  member: OrganizationUser
}>();

const $t = useTranslation('views.organization.members');
const organizationStore = useOrganizationStore();
const userStore = useUserStore();

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

const memberIsTheOnlyAdmin = computed(() => organizationStore.adminsCount === 1 && props.member.role === 'admin');
const memberIsCurrentUser = computed(() => props.member.email === userStore.user?.email || false);
const deleteButtonDisabled = computed(() => (memberIsTheOnlyAdmin.value
  || memberIsCurrentUser.value));

const deleteModalOpened = ref(false);
const setDeleteModalOpened = (value: boolean) => {
  deleteModalOpened.value = value;
  trackModal(value, 'orgUser', 'delete');
};

const remove = async () => {
  await organizationStore.deleteOrganizationUser(props.member);
  setDeleteModalOpened(false);
  trackId(USER_REMOVED_ORG, props.member.email);
};

const subtitle = computed(() => (
  `${$t('deleteMember.text1')} ${props.member.email} ${$t('deleteMember.text2')}`
));
</script>
<template>
  <AlertModal
    v-if="deleteModalOpened"
    data-test="remove-user"
    :title="$t('deleteMember.title')"
    :warning="$t('deleteMember.warning')"
    :subtitle="subtitle"
    :confirmation="$t('deleteMember.confirmation')"
    @close="() => setDeleteModalOpened(false)"
    @confirm="remove"
  />
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
        v-if="memberIsCurrentUser"
        :options="organizationRoleOptions"
        :selected="preselectedOrganizationRole"
        capitalize-options
        inline
        @select="selectOrganizationRole"
      />
      <TableLabel
        v-else
        :label="preselectedOrganizationRole"
        class="ml-3"
      />
    </TableData>
    <TableData>
      <GenericDropDown
        v-if="organizationStore.isCurrentUserAdmin"
        :options="roleOptions"
        :selected="props.member.role ? $t(props.member.role) : '------'"
        capitalize-options
        inline
        :disabled="memberIsTheOnlyAdmin"
        @select="selectRole"
      />
      <TableLabel
        v-else
        :label="props.member.role ? $t(props.member.role) : '------'"
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
      <div
        v-if="organizationStore.isCurrentUserAdmin"
        ref="userOptions"
      >
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
          <GenericButton
            data-test="delete-key-button"
            icon-name="trash"
            :text="$t('delete')"
            :type="ButtonType.Text"
            :size="SizeType.Inline"
            :disabled="deleteButtonDisabled"
            @click="() => setDeleteModalOpened(true)"
          />
        </div>
      </div>
    </TableData>
  </TableRow>
</template>
