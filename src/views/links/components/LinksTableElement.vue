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
</script>

<template>
  <tr class="bg-white border-b hover:bg-gray-100">
    <td class="py-4 px-6 flex flex-row items-center">
      <InstitutionLogo
        :institution-id="props.link.institution.id"
        class="flex-shrink-0 h-10 w-10 rounded-full"
      />
      <div class="ml-3 text-sm text-gray-500 whitespace-nowrap">
        <p class="font-medium">
          {{ props.link.institution.name }}
        </p>
        <p class="font-normal capitalize">
          {{ props.link.holderType }}
        </p>
      </div>
    </td>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <div v-if="props.link.holderType === 'individual'">
        <p class="text-gray-900">
          {{ props.link.holderName }}
        </p>
        <p class="font-normal text-gray-600">
          {{ rutFormat(props.link.holderId) }}
        </p>
      </div>
      <p v-else>
        -
      </p>
    </td>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
      <div v-if="props.link.holderType === 'business'">
        <p class="text-gray-900">
          {{ props.link.holderName }}
        </p>
        <p class="font-normal text-gray-600">
          {{ rutFormat(props.link.holderId) }}
        </p>
      </div>
      <p v-else>
        -
      </p>
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      {{ props.link.lastTimeRefreshed || '-' }}
    </td>
    <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
      <GenericToggle
        :active="props.link.active"
        :loading="updating"
        @toggle="toggleActive"
      />
    </td>
    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
      <a
        class="text-red-600 cursor-pointer hover:underline"
        @click="remove"
      >{{ $t('remove') }}</a>
    </td>
  </tr>
</template>
