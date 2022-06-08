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
  (e: 'updatePage', amount: number): void,
}>();

const $t = useTranslation('table.pagination');

const numberOfPages = computed(() => {
  let quot = Math.trunc(props.totalResults / props.pageSize);
  const rem = props.totalResults % props.pageSize;
  if (rem > 0) {
    quot += 1;
  }
  return quot;
});

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === numberOfPages.value);
const showLastPageNumber = computed(() => !isLastPage.value && numberOfPages.value !== 0);
const isLeftPageNextToCurrentPage = computed(() => props.currentPage - 1 !== 1);
const isRightPageNextToCurrentPage = computed(() => (
  props.currentPage + 1 !== numberOfPages.value
));
const disableNextPage = computed(() => isLastPage.value || props.loading);

const pageSizeOptions = ['10', '20', '30', '40', '50', '75', '100'];

const selectResultAmount = (amount: string) => {
  emit('updatePageSize', Number(amount));
};

const updatePage = (amount: number) => {
  emit('updatePage', amount);
};

const goToPreviousPage = () => {
  updatePage(-1);
};

const goToNextPage = () => {
  updatePage(1);
};

const goToFirstPage = () => {
  updatePage(-props.currentPage + 1);
};

const linksText = computed(() => (
  (props.totalResults === 1) ? props.resultItemText.slice(0, -1) : props.resultItemText
));
</script>

<template>
  <div class="flex justify-between mt-5 mb-10">
    <div class="flex flex-row space-x-3 items-center">
      <GenericDropDown
        label="Show"
        :selected="props.pageSize.toString()"
        :options="pageSizeOptions"
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
        class="rotate-180"
        :type="ButtonType.Text"
        :disabled="isFirstPage"
        icon-name="chevron"
        @click="goToPreviousPage"
      />
      <GenericButton
        v-if="!isFirstPage"
        :type="ButtonType.Text"
        text="1"
        @click="goToFirstPage"
      />
      <p
        v-if="!isFirstPage && isLeftPageNextToCurrentPage"
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
        v-if="showLastPageNumber && isRightPageNextToCurrentPage"
        class="py-2 leading-tight text-primary-main"
      >
        ...
      </p>
      <div
        v-if="showLastPageNumber"
        class="z-10 py-2 px-3 leading-tight text-primary-main"
      >
        {{ numberOfPages.toString() }}
      </div>
      <GenericButton
        :type="ButtonType.Text"
        :disabled="disableNextPage"
        icon-name="chevron"
        @click="goToNextPage"
      />
    </div>
  </div>
</template>
