<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { usePaymentsStore } from '@/stores/payments';
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
import CrossIcon from '@/assets/svg/CrossIcon.vue';
import GenericInput from '@/components/forms/GenericInput.vue';

const props = withDefaults(defineProps<{
  title?: string,
  label: string,
  placeholder?: string,
  hint?: string,
  opened: boolean,
  disabled?: boolean,
}>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: 'search', value: string): void,
  (e: 'open'): void,
  (e: 'close'): void,
  (e: 'delete'): void,
}>();

const $t = useTranslation('table.filters');

const searchInput = ref('');

const linksStore = useLinksStore();
const paymentsStore = usePaymentsStore();

const searchInfo = computed(() => searchInput.value || '');

const openSearch = () => {
  emit('open');
};

const search = (value: string) => {
  emit('search', value);
};

const deleteSearch = () => {
  if (!linksStore.loading || !paymentsStore.loading) {
    emit('delete');
  }
};

const searchFilter = ref(null);
onClickOutside(searchFilter, () => {
  emit('close');
});
</script>

<template>
  <div ref="searchFilter">
    <div
      class="text-primary-main whitespace-nowrap bg-primary-surface disabled:text-disabled-color
      rounded-full flex flex-row items-center space-x-1 pl-2 pr-1 py-1 capitalize"
      :disabled="props.disabled"
      @click="openSearch()"
    >
      <div> {{ props.label }} | {{ searchInfo }} </div>
      <CrossIcon
        class="cursor-pointer h-4 w-4 min-h-4 min-w-4"
        @click.stop="deleteSearch()"
      />
    </div>
    <div
      class="
        absolute mt-2 ml-1 text-base bg-white cursor-pointer
        shadow-lg rounded-lg z-50
      "
      :class="{ 'hidden': !props.opened }"
    >
      <div
        v-if="props.title"
        class="py-3 px-4 text-body-color font-semibold text-base"
      >
        {{ props.title }}
      </div>
      <GenericInput
        v-model="searchInput"
        class="px-2"
        :size="SizeType.Small"
        :label="props.label"
        :placeholder="props.placeholder"
        :hint="props.hint"
      />
      <div class="mx-1 mb-1">
        <GenericButton
          class="box-border w-full"
          :type="ButtonType.Primary"
          :text="$t('search')"
          @click="search(searchInput)"
        />
      </div>
    </div>
  </div>
</template>
