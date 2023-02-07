<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { LinkFilterType } from '@/interfaces/utilities/enums';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import TableFilter from '@/components/table/utils/TableFilter.vue';

const $t = useTranslation('views.links.table');
const linksStore = useLinksStore();

const isTableEmpty = computed(() => (
  linksStore.paginatedlinks.length === 0 && !linksStore.hasAppliedFilters
));

const showAndOpenFilter = (label: LinkFilterType) => {
  linksStore.filtersShown.add(label);
  linksStore.filtersOpened.add(label);
};
</script>

<template>
  <TableHead>
    <TableHeader><div> {{ $t('headers.institution') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.user') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.business') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.lastRefreshed') }} </div></TableHeader>
    <TableHeader>
      <div v-if="isTableEmpty">
        {{ $t('headers.password') }}
      </div>
      <TableFilter
        v-else
        :label="$t('headers.password')"
        @toggle="showAndOpenFilter(LinkFilterType.Password)"
      />
    </TableHeader>
    <TableHeader>
      <div v-if="isTableEmpty">
        {{ $t('headers.active') }}
      </div>
      <TableFilter
        v-else
        :label="$t('headers.active')"
        @toggle="showAndOpenFilter(LinkFilterType.Active)"
      />
    </TableHeader>
    <TableHeader><div /></TableHeader>
  </TableHead>
</template>
