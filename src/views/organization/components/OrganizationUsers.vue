<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useOrganizationStore } from '@/stores/organization';
import { useTranslation } from '@/locales';
import { ButtonType } from '@/interfaces/utilities/enums';
import { trackModal } from '@/services/analytics';
import GenericTable from '@/components/table/GenericTable.vue';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericButton from '@/components/GenericButton.vue';
import InviteUser from './inviteUser.vue';
import OrganizationUserTableRow from './OrganizationUserTableRow.vue';

const $t = useTranslation('views.organization.members');
const organizationStore = useOrganizationStore();
const headers = [$t('name'), $t('email'), $t('organizationRole'), $t('permissions'), $t('memberSince'), $t('status'), ''];

const isInviteMemberOpened = ref(false);
const setInviteMemberOpened = (value: boolean) => {
  isInviteMemberOpened.value = value;
  trackModal(value, 'members', 'add');
};

const search = ref('');

const filteredMembers = computed(() => {
  const searchValue = search.value.toLowerCase();
  return organizationStore.organizationUsers.filter(
    (member) => member.email.toLowerCase().includes(searchValue)
    || member.name.toLowerCase().includes(searchValue),
  );
});

onMounted(() => {
  organizationStore.loadOrganizationUsers();
});
</script>
<template>
  <InviteUser
    v-if="isInviteMemberOpened"
    @close="() => setInviteMemberOpened(false)"
  />
  <div class="space-y-3">
    <div class="font-medium text-2xl text-heading-color">
      {{ $t('title') }}
    </div>
    <div class="flex justify-between">
      <div class="flex flex-row">
        <GenericInput
          v-model="search"
          :placeholder="$t('searchPlaceholder')"
          left-icon-name="search"
        />
      </div>
      <GenericButton
        v-if="organizationStore.isCurrentUserAdmin"
        icon-name="add"
        class="ml-4 capitalize"
        :type="ButtonType.Primary"
        :text="$t('inviteMemberButton')"
        @click="() => setInviteMemberOpened(true)"
      />
    </div>
    <div>
      <GenericTable>
        <template #head>
          <TableHead>
            <TableHeader
              v-for="header in headers"
              :key="header"
              :header="header"
            >
              <div> {{ header }} </div>
            </TableHeader>
          </TableHead>
        </template>

        <template #content>
          <OrganizationUserTableRow
            v-for="member in filteredMembers"
            :key="member.email"
            :member="member"
          />
        </template>
      </GenericTable>
      <div
        v-if="organizationStore.loadingUsers"
        class="flex justify-center w-full pt-4"
      >
        <LoadingSpinner />
      </div>
    </div>
  </div>
</template>
