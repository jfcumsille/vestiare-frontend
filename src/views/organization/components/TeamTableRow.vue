<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { User } from '@/interfaces/entities/user';
// import { useTranslation } from '@/locales';
import { ButtonType, SizeType, HorizontalPositionType } from '@/interfaces/utilities/enums';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';
import TableDate from '@/components/table/utils/TableDate.vue';
// import GenericBadge from '@/components/GenericBadge.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import GenericButton from '@/components/GenericButton.vue';
import GenericOptionsModal from '@/components/GenericOptionsModal.vue';

const props = defineProps<{ member: User }>();
// const $t = useTranslation('views.organization.table');

const showConfigMemberModal = ref(false);
const toggleShowConfigMember = () => {
  showConfigMemberModal.value = !showConfigMemberModal.value;
};
const configMemberModal = ref(null);
onClickOutside(configMemberModal, () => {
  showConfigMemberModal.value = false;
});

const userMenuOptions = [
  { label: 'accept', action: 'logout', iconName: 'circle-check' },
  { label: 'deny', action: 'logout', iconName: 'circle-cross' },
  { label: 'delete', action: 'cross', iconName: 'trash' },
];
const isChecked = ref(false);

const handleOptionSelected = (value: string) => console.log('Selected value:', value);
// const memberStatusBadgeColor = computed(() => {
//   const states = {
//     adminAccepted: 'red',
//     userAccepted: 'green',
//     invitationSent: 'blue',
//     userRejected: 'red',
//   };
//   return states[props.member.status];
// });
</script>

<template>
  <TableRow>
    <TableData>
      <input
        v-model="isChecked"
        data-test="terms-checkbox"
        type="checkbox"
        class="w-4 h-4 accent-primary-main hover:accent-primary-main"
      >
    </TableData>
    <TableData>
      <TableLabel
        :label="props.member.name"
      />
    </TableData>
    <TableData>
      <TableLabel
        :sub-label="props.member.email"
      />
    </TableData>
    <TableData>
      <GenericButton
        :type="ButtonType.Text"
        text="Admin"
        :size="SizeType.Small"
        icon-name="lock"
        :icon-position="HorizontalPositionType.Right"
      />
    </TableData>
    <TableData>
      <TableDate
        date-string="2021-08-24T12:52:58.394Z"
      />
    </TableData>
    <!-- <TableData>
      <GenericBadge
        data-test="member-status-badge"
        :text="memberStatusBadgeText"
        :color="memberStatusBadgeColor"
        @click="openRefreshModal"
      />
    </TableData> -->
    <TableData />

    <TableData>
      <div ref="configMemberModal">
        <ThreeDots
          data-test="more-options-button"
          class="cursor-pointer h-6 pr-1 w-6"
          @click="toggleShowConfigMember"
        />
        <GenericOptionsModal
          v-if="showConfigMemberModal"
          :options="userMenuOptions"
          @select="(value: string) => handleOptionSelected(value)"
        />
        <!-- <div
          v-if="showConfigMemberModal"
          class="
            absolute right-0 -mr-20 px-4 py-3
            bg-white rounded-lg border border-light-gray drop-shadow-md
          "
        >
          <button
            data-test="delete-key-button"
            class="text-primary-main hover:text-primary-hover"
            @click="TODO"
          >
            {{ $t('delete') }} {{ name }}
          </button> -->
        <!-- </div> -->
      </div>
    </TableData>

    <!-- <TableData>
      <button
        ref="dropdownMenu"
        data-test="nav-bar-profile-settings-link"
        class="cursor-pointer text-primary-main hover:text-primary-hover flex"
        @click="pressUserMenu"
      >
        <PersonIcon class="mr-2 mt-1" />
        <p class="capitalize">
          {{ truncate(userStore.user?.name || $t('myProfile'), 22) }}
        </p>
        <GenericOptionsModal
          v-if="isUserMenuOpen"
          :options="userMenuOptions"
          @select="(value: string) => handleOptionSelected(value)"
        />
      </button>
    </TableData> -->
  </TableRow>
</template>
