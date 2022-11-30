<script setup lang="ts">
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { LinkFilterType } from '@/interfaces/utilities/enums';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import TableFilter from '@/components/table/utils/TableFilter.vue';

const $t = useTranslation('views.links.table');
const linksStore = useLinksStore();

const openFilter = (label: LinkFilterType) => {
  if (label === LinkFilterType.Active) {
    linksStore.openedActive = true;
  }
  if (label === LinkFilterType.Password) {
    linksStore.openedPassword = true;
  }
};
</script>

<template>
  <TableHead>
    <TableHeader><div> {{ $t('headers.institution') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.user') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.business') }} </div></TableHeader>
    <TableHeader><div> {{ $t('headers.lastRefreshed') }} </div></TableHeader>
    <TableHeader>
      <TableFilter
        :label="$t('headers.password')"
        @toggle="openFilter(LinkFilterType.Password)"
      />
    </TableHeader>
    <TableHeader>
      <TableFilter
        :label="$t('headers.active')"
        @toggle="openFilter(LinkFilterType.Active)"
      />
    </TableHeader>
    <TableHeader><div /></TableHeader>
  </TableHead>
</template>
