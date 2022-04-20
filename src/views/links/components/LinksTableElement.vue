<script setup lang="ts">
import { computed, ref } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { Link } from '@/interfaces/entities/links';
import { CountryCode, HolderType } from '@/interfaces/utilities/enums';
import { formatDate, formatTime } from '@/utils/date';
import {
  MODAL_VIEWED,
  MODAL_CLOSED,
  LINK_ACTIVE_CHANGED,
  LINK_DELETED,
  LINK_REFRESHED,
} from '@/constants/analyticsEvents';
import { track } from '@/services/analytics';
import GenericToggle from '@/components/GenericToggle.vue';
import GenericBadge from '@/components/GenericBadge.vue';
import InstitutionLogo from '@/components/InstitutionLogo.vue';
import DeleteLinkModal from './DeleteLinkModal.vue';
import ResumeLinkRefreshingModal from './ResumeLinkRefreshingModal.vue';

const props = defineProps<{ link: Link }>();

const $t = useTranslation('views.links.table');

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
  props.link.preventRefresh ? $t('badges.invalidPassword') : $t('badges.validPassword')
));
const passwordBadgeColor = computed(() => (props.link.preventRefresh ? 'red' : 'green'));

const trackLinkModal = (opened: boolean, action: string) => {
  if (opened) {
    track(MODAL_VIEWED, {
      location: 'links',
      action,
    });
  } else {
    track(MODAL_CLOSED, {
      location: 'links',
      action,
    });
  }
};
const setDeleteModalOpened = (value: boolean) => {
  deleteModalOpened.value = value;
  trackLinkModal(value, 'delete');
};

const setRefreshModalOpened = (value: boolean) => {
  refreshModalOpened.value = value;
  trackLinkModal(value, 'refresh');
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
  track(LINK_REFRESHED, {
    id: props.link.id,
    origin: 'dashboard',
  });
};

const toggleActive = async () => {
  updating.value = true;
  await $linksStore.updateLink(
    props.link,
    { active: !props.link.active },
  );
  updating.value = false;
  track(LINK_ACTIVE_CHANGED, {
    id: props.link.id,
    active: props.link.active,
  });
};

const remove = async () => {
  await $linksStore.removeLink(props.link);
  setDeleteModalOpened(false);
  track(LINK_DELETED, {
    id: props.link.id,
    origin: 'dashboard',
  });
};
</script>

<template>
  <DeleteLinkModal
    v-if="deleteModalOpened"
    data-test="remove-link"
    @close="() => setDeleteModalOpened(false)"
    @remove="remove"
  />
  <ResumeLinkRefreshingModal
    v-if="refreshModalOpened"
    @close="() => setRefreshModalOpened(false)"
    @refresh="refresh"
  />
  <tr class="bg-white border-b hover:bg-light-gray">
    <td class="p-4 flex flex-row items-center">
      <InstitutionLogo
        :institution-id="props.link.institution.id"
        class="flex-shrink-0 h-10 w-10 rounded-full"
      />
      <div class="ml-3 text-sm text-body-color whitespace-nowrap">
        <p class="font-medium">
          {{ props.link.institution.name }}
        </p>
        <p class="font-normal capitalize">
          {{ props.link.holderType }}
        </p>
      </div>
    </td>
    <td class="p-4 text-sm font-medium whitespace-nowrap">
      <p
        v-if="props.link.holderType === HolderType.Individual"
        class="text-heading-color"
      >
        {{ props.link.holderName }}
      </p>
      <p class="font-normal text-body-color">
        {{ formattedUsername }}
      </p>
    </td>
    <td class="p-4 text-sm font-medium whitespace-nowrap">
      <div v-if="props.link.holderType === HolderType.Business">
        <p class="text-heading-color">
          {{ props.link.holderName }}
        </p>
        <p class="font-normal text-body-color">
          {{ formattedHolderId }}
        </p>
      </div>
      <p v-else>
        -
      </p>
    </td>
    <td class="p-4 text-sm text-body-color whitespace-nowrap flex-col">
      <div v-if="props.link.lastTimeRefreshed">
        <div>
          {{ formatDate(props.link.lastTimeRefreshed) }}
        </div>
        <div class="text-xs">
          {{ formatTime(props.link.lastTimeRefreshed) }}
        </div>
      </div>
      <div v-else>
        -
      </div>
    </td>
    <td class="p-4 text-sm text-body-color whitespace-nowrap">
      <GenericBadge
        data-test="credentials-validity-badge"
        :class="{'cursor-pointer': props.link.preventRefresh}"
        :text="passwordBadgeText"
        :color="passwordBadgeColor"
        @click="openRefreshModal"
      />
    </td>
    <td class="p-4 text-sm text-body-color whitespace-nowrap">
      <GenericToggle
        data-test="link-active-toggle"
        :active="props.link.active"
        :loading="updating"
        @toggle="toggleActive"
      />
    </td>
    <td class="p-4 text-sm font-medium text-right whitespace-nowrap">
      <a
        data-test="remove-link-button"
        class="text-danger-main cursor-pointer hover:underline"
        @click="() => setDeleteModalOpened(true)"
      >{{ $t('buttons.remove') }}</a>
    </td>
  </tr>
</template>
