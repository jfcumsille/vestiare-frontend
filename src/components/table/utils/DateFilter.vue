<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useLocale } from '@/composables/locale';
import { useTranslation } from '@/locales';
import { useLinksStore } from '@/stores/links';
import { Nullable } from '@/interfaces/common';
import { ButtonType, SizeType, DateStyle } from '@/interfaces/utilities/enums';
import {
  daysOfMonth, months, years, hours, formatDate, getIsoDateString, addDays, invalidDate,
} from '@/utils/date';
import GenericDropDown from '@/components/GenericDropDown.vue';
import GenericButton from '@/components/GenericButton.vue';
import CrossIcon from '@/assets/svg/CrossIcon.vue';

const props = defineProps<{
  label: string,
  opened: boolean,
  optionsTitle?: string,
  optionsSubtitle?: string,
}>();

const emit = defineEmits<{
  (e: 'apply', since: string, until: string): void,
  (e: 'open'): void,
  (e: 'close'): void,
  (e: 'delete'): void,
}>();

const locale = useLocale();
const $t = useTranslation('date');
const linksStore = useLinksStore();

const appliedSinceDatestring = ref<Nullable<string>>(null);
const appliedUntilDatestring = ref<Nullable<string>>(null);
const currentDate = ref(new Date());

const sinceDay = ref('01');
const sinceMonth = ref('01');
const sinceYear = ref('2022');
const sinceHour = ref('00:00');

const sinceDatestring = computed(() => {
  const dateStringFromPickers = `${sinceYear.value}-${sinceMonth.value}-${sinceDay.value}T${sinceHour.value}:00`;
  return getIsoDateString(dateStringFromPickers);
});
const sinceDateTime = computed(() => (
  new Date(sinceDatestring.value)
));

const untilDay = ref(currentDate.value.getDate()
  .toLocaleString(undefined, { minimumIntegerDigits: 2 }));
const untilMonth = ref((currentDate.value.getMonth() + 1)
  .toLocaleString(undefined, { minimumIntegerDigits: 2 }));
const untilYear = ref(currentDate.value.getFullYear().toString());
const untilHour = ref(`${currentDate.value.getHours().toString()}:00`);

const untilDatestring = computed(() => {
  const dateStringFromPickers = `${untilYear.value}-${untilMonth.value}-${untilDay.value}T${untilHour.value}:00`;
  return getIsoDateString(dateStringFromPickers);
});
const untilDateTime = computed(() => (
  new Date(untilDatestring.value)
));

const filterInfo = computed(() => {
  if (appliedSinceDatestring.value && appliedUntilDatestring.value) {
    return `${formatDate(appliedSinceDatestring.value, DateStyle.Short, locale.value)} - ${formatDate(appliedUntilDatestring.value, DateStyle.Short, locale.value)}`;
  }
  return '';
});

const selectSinceDay = (value: string) => {
  sinceDay.value = value;
};
const selectSinceMonth = (value: string) => {
  sinceMonth.value = value;
};
const selectSinceYear = (value: string) => {
  sinceYear.value = value;
};
const selectSinceHour = (value: string) => {
  sinceHour.value = value;
};

const selectUntilDay = (value: string) => {
  untilDay.value = value;
};
const selectUntilMonth = (value: string) => {
  untilMonth.value = value;
};
const selectUntilYear = (value: string) => {
  untilYear.value = value;
};
const selectUntilHour = (value: string) => {
  untilHour.value = value;
};

const isDisabled = computed(() => (
  (untilDateTime.value > currentDate.value)
  || (sinceDateTime.value >= untilDateTime.value)
  || invalidDate(sinceDateTime.value)
  || invalidDate(untilDateTime.value)
));

const openFilter = () => {
  emit('open');
};

const applyFilter = () => {
  appliedSinceDatestring.value = sinceDatestring.value;
  appliedUntilDatestring.value = untilDatestring.value;
  emit('apply', sinceDatestring.value, untilDatestring.value);
};

const deleteFilter = () => {
  appliedSinceDatestring.value = null;
  appliedUntilDatestring.value = null;
  if (!linksStore.loading) {
    emit('delete');
  }
};

const dateTableFilter = ref(null);
onClickOutside(dateTableFilter, () => {
  emit('close');
});

onMounted(() => {
  const dateOneMonthBefore = addDays(currentDate.value, -30);
  sinceDay.value = dateOneMonthBefore.getDate()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 });
  sinceMonth.value = (dateOneMonthBefore.getMonth() + 1)
    .toLocaleString(undefined, { minimumIntegerDigits: 2 });
  sinceYear.value = dateOneMonthBefore.getFullYear().toString();
});
</script>

<template>
  <div ref="dateTableFilter">
    <div
      class="text-primary-main whitespace-nowrap bg-primary-surface disabled:text-disabled-color
      rounded-full flex flex-row items-center space-x-1 pl-2 pr-1 py-1 capitalize"
      :disabled="linksStore.loading"
      @click="openFilter()"
    >
      <div> {{ props.label }} | {{ filterInfo }} </div>
      <CrossIcon
        class="cursor-pointer h-4 w-4 min-h-4 min-w-4"
        @click.stop="deleteFilter()"
      />
    </div>
    <div
      class="
        absolute mt-2 ml-1 text-base bg-white cursor-pointer
        shadow-lg rounded-lg z-50 p-1
      "
      :class="{ 'hidden': !props.opened }"
    >
      <div
        v-if="props.optionsTitle"
        class="py-3 px-4 text-body-color font-semibold text-base"
      >
        {{ props.optionsTitle }}
      </div>
      <div class="space-y-10 mb-6">
        <div class="flex flex-row mx-4 space-x-1 items-end">
          <GenericDropDown
            :label="$t('day')"
            :size="SizeType.Small"
            :selected="sinceDay"
            :options="daysOfMonth(sinceMonth)"
            @select="selectSinceDay"
          />
          <GenericDropDown
            :label="$t('month')"
            :size="SizeType.Small"
            :selected="sinceMonth"
            :options="months"
            @select="selectSinceMonth"
          />
          <GenericDropDown
            :label="$t('year')"
            :size="SizeType.Small"
            :selected="sinceYear"
            :options="years"
            @select="selectSinceYear"
          />
          <div>
            <div class="bg-border-color h-1.5px w-5 mb-6 mx-3" />
          </div>
          <GenericDropDown
            :label="$t('hour')"
            :size="SizeType.Small"
            :selected="sinceHour"
            :options="hours"
            @select="selectSinceHour"
          />
        </div>
        <div class="flex flex-row mx-4 space-x-1 items-end">
          <GenericDropDown
            :label="$t('day')"
            :size="SizeType.Small"
            :selected="untilDay"
            :options="daysOfMonth(sinceMonth)"
            @select="selectUntilDay"
          />
          <GenericDropDown
            :label="$t('month')"
            :size="SizeType.Small"
            :selected="untilMonth"
            :options="months"
            @select="selectUntilMonth"
          />
          <GenericDropDown
            :label="$t('year')"
            :size="SizeType.Small"
            :selected="untilYear"
            :options="years"
            @select="selectUntilYear"
          />
          <div>
            <div class="bg-border-color h-1.5px w-5 mb-6 mx-3" />
          </div>
          <GenericDropDown
            :label="$t('hour')"
            :size="SizeType.Small"
            :selected="untilHour"
            :options="hours"
            @select="selectUntilHour"
          />
        </div>
      </div>
      <div class="text-body-color text-sm mx-4 my-3">
        {{ props.optionsSubtitle }}
      </div>
      <GenericButton
        class="box-border w-full"
        :type="ButtonType.Primary"
        text="Apply"
        :disabled="isDisabled"
        @click="applyFilter()"
      />
    </div>
  </div>
</template>
