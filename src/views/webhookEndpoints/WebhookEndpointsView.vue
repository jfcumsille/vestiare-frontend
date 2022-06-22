<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { DASHBOARD_ORIGIN, WEBHOOK_ENDPOINTS_VIEWED } from '@/constants/analyticsEvents';
import { DOCS_WEBHOOKS } from '@/constants/urls';
import { DEFAULT_PAGE_SIZE } from '@/constants/table';
import { page, trackModal } from '@/services/analytics';
import { ButtonType } from '@/interfaces/utilities/enums';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GenericTable from '@/components/table/GenericTable.vue';
import TablePagination from '@/components/table/TablePagination.vue';
import GenericButton from '@/components/GenericButton.vue';
import WebhookEndpointCreationModal from '@/views/webhookEndpoints/components/WebhookEndpointCreationModal.vue';
import WebhookEndpointsTableHead from '@/views/webhookEndpoints/components/WebhookEndpointsTableHead.vue';
import WebhookEndpointsTableRow from '@/views/webhookEndpoints/components/WebhookEndpointsTableRow.vue';
import NoWebhookEndpointsContent from '@/views/webhookEndpoints/components/noWebhookEndpointsContent.vue';

const $t = useTranslation('views.webhookEndpoints');

const webhookEndpointsStore = useWebhookEndpointsStore();

const modalOpened = ref(false);
const setModalOpened = (value: boolean) => {
  modalOpened.value = value;
  trackModal(value, 'webhook_endpoints', 'create');
};

const pageSize = ref(DEFAULT_PAGE_SIZE);
const currentPage = ref(1);

const webhookEndpoints = computed(() => {
  const start = ((currentPage.value - 1) * pageSize.value);
  const end = currentPage.value * pageSize.value;
  return webhookEndpointsStore.webhookEndpoints.slice(start, end);
});

const updatePageSize = (value: number) => {
  currentPage.value = 1;
  pageSize.value = value;
};

const changeCurrentPageBy = (value: number) => {
  currentPage.value += value;
};

onMounted(() => {
  page(WEBHOOK_ENDPOINTS_VIEWED, {
    type: 'main',
    origin: DASHBOARD_ORIGIN,
  });
});
</script>

<template>
  <div
    data-test="webhook-endpoints-view"
    class="flex flex-col p-10 items-center max-w-screen-xl w-full"
  >
    <WebhookEndpointCreationModal
      v-if="modalOpened"
      @close="() => setModalOpened(false)"
    />
    <div class="w-full">
      <div class="flex justify-between">
        <div class="font-medium text-2xl text-heading-color self-start">
          {{ $t('title_other') }}
        </div>
        <GenericButton
          data-test="webhook-create-button"
          :type="ButtonType.Primary"
          :text="$t('creation.buttonText')"
          :disabled="modalOpened"
          icon-name="add"
          class="px-6"
          @click="() => setModalOpened(true)"
        />
      </div>
      <div class="flex justify-between mt-2">
        <div
          v-if="!webhookEndpoints.length && !webhookEndpointsStore.loading"
          class="text-body-color font-normal max-w-3xl"
        >
          {{ $t('subtitle') }}
        </div>
        <a
          v-else
          class="text-primary-main hover:text-primary-hover"
          :href="DOCS_WEBHOOKS"
          target="_blank"
        >
          {{ $t('whatisAWebhookEndpoint') }}
        </a>
        <a
          class="text-primary-main hover:text-primary-hover"
          :href="DOCS_WEBHOOKS"
          target="_blank"
        >
          {{ $t('learnMore') }}
        </a>
      </div>

      <GenericTable
        v-if="webhookEndpoints.length"
        class="mt-6"
      >
        <template #head>
          <WebhookEndpointsTableHead />
        </template>

        <template #content>
          <WebhookEndpointsTableRow
            v-for="webhookEndpoint in webhookEndpoints"
            :key="webhookEndpoint.id"
            :webhook-endpoint="webhookEndpoint"
          />
        </template>
        <template #pagination>
          <TablePagination
            :loading="webhookEndpointsStore.loading"
            :current-page="currentPage"
            :page-size="pageSize"
            :total-results="webhookEndpointsStore.total"
            :result-item-text="$t('title', { count: webhookEndpointsStore.total})"
            @update-page-size="updatePageSize"
            @change-page-by="changeCurrentPageBy"
          />
        </template>
      </GenericTable>
    </div>
    <div
      v-if="webhookEndpointsStore.loading"
      class="flex justify-center w-full pt-4"
    >
      <LoadingSpinner />
    </div>
    <NoWebhookEndpointsContent
      v-if="!webhookEndpoints.length && !webhookEndpointsStore.loading"
    />
  </div>
</template>
