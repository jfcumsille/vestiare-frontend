<script setup lang="ts">
import { computed } from 'vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import GenericButton from '@/components/GenericButton.vue';
import { ButtonType } from '@/interfaces/utilities/enums';
import { useTranslation } from '@/locales';

const props = defineProps<{
  loading: boolean,
  currentPage: number,
  resultsPerPage: number,
  totalResults: number,
  resultItemText: string,
}>();

const emit = defineEmits<{
  (e: 'updateResultsPerPage', amount: number): void,
  (e: 'updatePage', amount: number): void,
}>();

const $t = useTranslation('table.pagination');

const numberOfPages = computed(() => {
  let quot = Math.trunc(props.totalResults / props.resultsPerPage);
  const rem = props.totalResults % props.resultsPerPage;
  if (rem > 0) {
    quot += 1;
  }
  return quot;
});

const showFirstPage = computed(() => props.currentPage !== 1);

const showLastPage = computed(() => (
  props.currentPage !== numberOfPages.value && numberOfPages.value !== 0
));

const resultsAmounts = [10, 20, 30, 40, 50, 75, 100];

const selectResultAmount = (amount: number) => {
  emit('updateResultsPerPage', amount);
};

const updatePage = (amount: number) => {
  emit('updatePage', amount);
};

const disableNextPage = computed(() => (
  numberOfPages.value === props.currentPage || props.loading
));

const disablePreviousPage = computed(() => props.currentPage === 1);

const linksText = computed(() => (
  (props.totalResults === 1) ? props.resultItemText.slice(0, -1) : props.resultItemText
));
</script>

<template>
  <div class="flex justify-between mt-5 mb-10">
    <div class="flex flex-row space-x-3 items-center">
      <GenericDropDown
        label="Show"
        :selected="props.resultsPerPage.toString()"
        :options="resultsAmounts"
        @select="selectResultAmount"
      />
      <div
        class="text-body-color text-base padding p-4"
      >
        {{ $t('of') }} {{ totalResults }} {{ linksText }}
      </div>
    </div>
    <div class="flex flex-row items-center">
      <GenericButton
        :type="ButtonType.Text"
        :disabled="disablePreviousPage"
        icon-name="chevron-left"
        @click="() => updatePage(-1)"
      />
      <GenericButton
        v-if="showFirstPage"
        :type="ButtonType.Text"
        text="1"
        @click="() => updatePage(-props.currentPage + 1)"
      />
      <p
        v-if="showFirstPage"
        class="py-2 leading-tight text-primary-main"
      >
        ...
      </p>
      <div
        class="z-10 py-2 px-3 leading-tight text-primary-pressed underline"
      >
        {{ currentPage }}
      </div>
      <p
        v-if="showLastPage"
        class="py-2 leading-tight text-primary-main"
      >
        ...
      </p>
      <GenericButton
        v-if="showLastPage"
        :type="ButtonType.Text"
        :text="numberOfPages.toString()"
        @click="() => updatePage(numberOfPages - props.currentPage)"
      />
      <GenericButton
        :type="ButtonType.Text"
        :disabled="disableNextPage"
        icon-name="chevron-right"
        @click="() => updatePage(1)"
      />
    </div>
  </div>
</template>
