<script setup lang="ts">
import { ref } from 'vue';
import { rutFormat } from 'rut-helpers';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { Link } from '@/interfaces/entities/links';
import GenericToggle from '@/components/GenericToggle.vue';
import InstitutionLogo from '@/components/InstitutionLogo.vue';

const props = defineProps<{ link: Link }>();

const $t = useTranslation('views.links.table.buttons');

const $linksStore = useLinksStore();

const updating = ref(false);

const toggleActive = async () => {
  updating.value = true;
  await $linksStore.updateLink(
    props.link,
    { active: !props.link.active },
  );
  updating.value = false;
};

const remove = () => {
  $linksStore.removeLink(props.link);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toDateString();
};
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString();
};
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="p-4 flex flex-row items-center">
      <InstitutionLogo
        :institution-id="props.link.institution.id"
        class="flex-shrink-0 h-10 w-10 rounded-full"
      />
      <div class="ml-3 text-sm text-body-txt-color whitespace-nowrap">
        <p class="font-medium">
          {{ props.link.institution.name }}
        </p>
        <p class="font-normal capitalize">
          {{ props.link.holderType }}
        </p>
      </div>
    </td>
    <td class="p-4 text-sm font-medium whitespace-nowrap">
      <div v-if="props.link.holderType === 'individual'">
        <p class="text-heading-txt-color">
          {{ props.link.holderName }}
        </p>
        <p class="font-normal text-body-txt-color">
          {{ rutFormat(props.link.holderId) }}
        </p>
      </div>
      <p v-else>
        -
      </p>
    </td>
    <td class="p-4 text-sm font-medium whitespace-nowrap">
      <div v-if="props.link.holderType === 'business'">
        <p class="text-heading-txt-color">
          {{ props.link.holderName }}
        </p>
        <p class="font-normal text-body-txt-color">
          {{ rutFormat(props.link.holderId) }}
        </p>
      </div>
      <p v-else>
        -
      </p>
    </td>
    <td class="p-4 text-sm text-body-txt-color whitespace-nowrap flex-col">
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
    <td class="p-4 text-sm text-body-txt-color whitespace-nowrap">
      <GenericToggle
        :active="props.link.active"
        :loading="updating"
        @toggle="toggleActive"
      />
    </td>
    <td class="p-4 text-sm font-medium text-right whitespace-nowrap">
      <a
        class="text-red-600 cursor-pointer hover:underline"
        @click="remove"
      >{{ $t('remove') }}</a>
    </td>
  </tr>
</template>
