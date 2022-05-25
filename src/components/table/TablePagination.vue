<script setup lang="ts">
import { ref, computed } from 'vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import GenericButton from '@/components/GenericButton.vue';
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';

const props = defineProps<{
  currentPage: number,
  resultsPerPage: number,
  totalResults: number,
}>();

const emit = defineEmits<{
  (e: 'updateResultsPerPage', amount: number): void,
  (e: 'updatePage', amount: number): void,
}>();

const numberOfPages = computed(() => {
  let quot = ~~(props.totalResults/props.resultsPerPage)
  const rem = props.totalResults % props.resultsPerPage;
  if (rem > 0) {
    quot += 1;
  }
  return quot;
});

const showFirstPage = computed(() => props.currentPage !== 1);

const showLastPage = computed(() => {
  return (props.currentPage !== numberOfPages.value);
});

const resultsAmounts = [10, 50, 100];
const selectResultAmount = (amount: number) => {
  emit('updateResultsPerPage', amount)
};

const updatePage = (amount: number) => {
  emit('updatePage', amount)
};

const disableNextPage = computed(() => {
  return numberOfPages.value === props.currentPage;
});

const disablePreviousPage = computed(() => {
  return props.currentPage === 1;
});
</script>

<template>
  <div class="flex justify-between mt-5">
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
        {{totalResults}} Results
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
      <p v-if="showFirstPage" class="py-2 leading-tight text-primary-main">...</p>
      <a href="#" aria-current="page" class="z-10 py-2 px-3 leading-tight text-primary-pressed underline">{{currentPage}}</a>
      <p v-if="showLastPage" class="py-2 leading-tight text-primary-main">...</p>
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
