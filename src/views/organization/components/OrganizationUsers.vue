<script setup lang="ts">
import { onMounted } from 'vue';
import { useOrganizationStore } from '@/stores/organization';
import { useTranslation } from '@/locales';
import GenericTable from '@/components/table/GenericTable.vue';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';
import TableDate from '@/components/table/utils/TableDate.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const $t = useTranslation('views.organization.members');
const organizationStore = useOrganizationStore();
const headers = [$t('name'), $t('email'), $t('memberSince')];

onMounted(() => {
  organizationStore.loadOrganizationUsers();
});
</script>
<template>
  <div class="font-medium text-2xl text-heading-color">
    {{ $t('title') }}
  </div>
  <div>
    <GenericTable>
      <template #head>
        <TableHead>
          <TableHeader
            v-for="header in headers"
            :key="header"
            :header="header"
          >
            <div> {{ header }} </div>
          </TableHeader>
        </TableHead>
      </template>

      <template #content>
        <TableRow
          v-for="member in organizationStore.organizationUsers"
          :key="member.email"
        >
          <TableData>
            <TableLabel
              :label="member.name"
            />
          </TableData>
          <TableData>
            <TableLabel
              :sub-label="member.email"
            />
          </TableData>
          <TableData>
            <TableDate
              :date-string="member.createdAt"
            />
          </TableData>
        </TableRow>
      </template>
    </GenericTable>
    <div
      v-if="organizationStore.loadingUsers"
      class="flex justify-center w-full pt-4"
    >
      <LoadingSpinner />
    </div>
  </div>
</template>
