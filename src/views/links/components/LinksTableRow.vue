<script setup lang="ts">
import { computed, ref } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { Link } from '@/interfaces/entities/links';
import { CountryCode, HolderType, BadgeStatus } from '@/interfaces/utilities/enums';
import { LINK_DELETED, LINK_REFRESHED } from '@/constants/analyticsEvents';
import { trackLinkStatus, trackModal, trackId } from '@/services/analytics';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';
import TableDate from '@/components/table/utils/TableDate.vue';
import GenericToggle from '@/components/GenericToggle.vue';
import GenericBadge from '@/components/GenericBadge.vue';
import InstitutionLogo from '@/components/InstitutionLogo.vue';
import AlertModal from '@/components/AlertModal.vue';

const props = defineProps<{ link: Link }>();

const $t = useTranslation('views.links');

const $linksStore = useLinksStore();

const deleteModalOpened = ref(false);
const refreshModalOpened = ref(false);
const updating = ref(false);

const formattedUsername = computed(() => {
  if (props.link.institution.country === CountryCode.CL) {
    return rutFormat(props.link.username);
  }
  return props.link.username;
});

const formattedHolderId = computed(() => {
  if (props.link.institution.country === CountryCode.CL) {
    return rutFormat(props.link.holderId);
  }
  return props.link.holderId;
});

const passwordBadgeText = computed(() => (
  props.link.preventRefresh ? $t('table.badges.invalidPassword') : $t('table.badges.validPassword')
));
const passwordBadgeColor = computed(() => (
  props.link.preventRefresh ? BadgeStatus.Danger : BadgeStatus.Success
));

const setDeleteModalOpened = (value: boolean) => {
  deleteModalOpened.value = value;
  trackModal(value, 'links', 'delete');
};

const setRefreshModalOpened = (value: boolean) => {
  refreshModalOpened.value = value;
  trackModal(value, 'links', 'refresh');
};

const openRefreshModal = () => {
  if (props.link.preventRefresh) {
    setRefreshModalOpened(true);
  }
};

const refresh = async () => {
  await $linksStore.updateLink(
    props.link,
    { preventRefresh: false },
  );
  setRefreshModalOpened(false);
  trackId(LINK_REFRESHED, props.link.id);
};

const toggleActive = async () => {
  updating.value = true;
  await $linksStore.updateLink(
    props.link,
    { active: !props.link.active },
  );
  updating.value = false;
  trackLinkStatus(props.link);
};

const remove = async () => {
  await $linksStore.removeLink(props.link);
  setDeleteModalOpened(false);
  trackId(LINK_DELETED, props.link.id);
};
</script>

<template>
  <AlertModal
    v-if="deleteModalOpened"
    data-test="remove-link"
    :title="$t('deleteLinkModal.title')"
    :warning="$t('deleteLinkModal.warning')"
    :subtitle="$t('deleteLinkModal.text')"
    :confirmation="$t('deleteLinkModal.confirmation')"
    @close="() => setDeleteModalOpened(false)"
    @confirm="remove"
  />
  <AlertModal
    v-if="refreshModalOpened"
    :title="$t('refreshWarningModal.title')"
    :warning="$t('refreshWarningModal.warning')"
    :subtitle="$t('refreshWarningModal.text')"
    :confirmation="$t('refreshWarningModal.confirmation')"
    @close="() => setRefreshModalOpened(false)"
    @confirm="refresh"
  />
  <TableRow>
    <TableData class="flex space-x-3 items-center">
      <InstitutionLogo
        :institution-id="props.link.institution.id"
        class="flex-shrink-0 w-8 h-8 rounded"
      />
      <TableLabel
        class="capitalize"
        :label="props.link.institution.name"
        :sub-label="props.link.holderType"
      />
    </TableData>
    <TableData>
      <TableLabel
        v-if="props.link.holderType === HolderType.Individual"
        :label="props.link.holderName"
        :sub-label="formattedUsername"
      />
      <TableLabel
        v-else
        :label="formattedUsername"
      />
    </TableData>
    <TableData>
      <TableLabel
        v-if="props.link.holderType === HolderType.Business"
        :label="props.link.holderName"
        :sub-label="formattedHolderId"
      />
      <p
        v-else
        class="text-disabled-color text-xs"
      >
        N/A
      </p>
    </TableData>
    <TableData>
      <TableDate
        :date-string="props.link.lastTimeRefreshed"
      />
    </TableData>
    <TableData>
      <GenericBadge
        data-test="credentials-validity-badge"
        :class="{'cursor-pointer': props.link.preventRefresh}"
        :text="passwordBadgeText"
        :status="passwordBadgeColor"
        @click="openRefreshModal"
      />
    </TableData>
    <TableData>
      <GenericToggle
        data-test="link-active-toggle"
        :active="props.link.active"
        :loading="updating"
        @toggle="toggleActive"
      />
    </TableData>
    <TableData>
      <a
        data-test="remove-link-button"
        class="
          text-sm font-medium text-right whitespace-nowrap
          text-danger-main cursor-pointer hover:underline"
        @click="() => setDeleteModalOpened(true)"
      >{{ $t('table.buttons.remove') }}</a>
    </TableData>
  </TableRow>
</template>
