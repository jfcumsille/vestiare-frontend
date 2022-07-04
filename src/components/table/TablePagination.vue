<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { ButtonType } from '@/interfaces/utilities/enums';
import GenericDropDown from '@/components/GenericDropDown.vue';
import GenericButton from '@/components/GenericButton.vue';

const props = defineProps<{
  loading: boolean,
  currentPage: number,
  pageSize: number,
  totalResults: number,
  resultItemText: string,
}>();

const emit = defineEmits<{
  (e: 'updatePageSize', amount: number): void,
  (e: 'changePageBy', amount: number): void,
}>();

const $t = useTranslation('table.pagination');

const numberOfPages = computed(() => Math.ceil(props.totalResults / props.pageSize));

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === numberOfPages.value);
const showLastPageNumber = computed(() => !isLastPage.value && numberOfPages.value !== 0);
const isLeftPageNextToCurrentPage = computed(() => props.currentPage - 1 !== 1);
const isRightPageNextToCurrentPage = computed(() => (
  props.currentPage + 1 !== numberOfPages.value
));
const disableNextPage = computed(() => (
  isLastPage.value || props.loading || props.totalResults === 0
));

const pageSizeOptions = ['10', '20', '30', '40', '50', '75', '100'];

const selectPageSize = (amount: string) => {
  emit('updatePageSize', Number(amount));
};

const goToPreviousPage = () => {
  emit('changePageBy', -1);
};

const goToNextPage = () => {
  emit('changePageBy', 1);
};

const goToFirstPage = () => {
  emit('changePageBy', -props.currentPage + 1);
};
</script>

<template>
  <div class="flex justify-between mt-5 mb-10">
    <div class="flex flex-row space-x-3 items-center">
      <GenericDropDown
        data-test="pagination-dropdown"
        :label="$t('show')"
        :selected="props.pageSize.toString()"
        :options="pageSizeOptions"
        capitalize-options
        @select="selectPageSize"
      />
      <div
        data-test="pagination-result-text"
        class="text-body-color text-base padding p-4"
      >
        {{ $t('of') }} {{ totalResults }} {{ resultItemText }}
      </div>
    </div>
    <div class="flex flex-row items-center">
      <GenericButton
        data-test="pagination-left-arrow-button"
        class="rotate-180"
        :type="ButtonType.Text"
        :disabled="isFirstPage"
        icon-name="chevron"
        @click="goToPreviousPage"
      />
      <GenericButton
        v-if="!isFirstPage"
        data-test="pagination-first-page-button"
        :type="ButtonType.Text"
        text="1"
        @click="goToFirstPage"
      />
      <p
        v-if="!isFirstPage && isLeftPageNextToCurrentPage"
        data-test="pagination-left-ellipsis"
        class="py-2 leading-tight text-primary-main"
      >
        ...
      </p>
      <div
        data-test="pagination-current-page"
        class="z-10 py-2 px-3 leading-tight text-primary-pressed underline"
      >
        {{ currentPage }}
      </div>
      <p
        v-if="showLastPageNumber && isRightPageNextToCurrentPage"
        data-test="pagination-right-ellipsis"
        class="py-2 leading-tight text-primary-main"
      >
        ...
      </p>
      <div
        v-if="showLastPageNumber"
        data-test="pagination-last-page"
        class="z-10 py-2 px-3 leading-tight text-primary-main"
      >
        {{ numberOfPages.toString() }}
      </div>
      <GenericButton
        data-test="pagination-right-arrow-button"
        :type="ButtonType.Text"
        :disabled="disableNextPage"
        icon-name="chevron"
        @click="goToNextPage"
      />
    </div>
  </div>
</template>
