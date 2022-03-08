<script setup lang="ts">
import LinkCreationButton from './LinkCreationButton.vue';

const props = defineProps<{
  live: boolean,
  widgetOpened: boolean,
}>();

const emit = defineEmits<{
  (e: 'set-widget-opened', value: boolean): void,
  (e: 'show-link-token', linkToken: string): void,
}>();

const setWidgetOpened = (value: boolean) => emit('set-widget-opened', value);
const showLinkToken = (linkToken: string) => emit('show-link-token', linkToken);
</script>

<template>
  <div class="flex flex-col my-auto">
    <div class="flex justify-center my-auto">
      <LinkCreationButton
        :live="props.live"
        product="movements"
        holder-type="individual"
        :widget-opened="props.widgetOpened"
        @set-widget-opened="setWidgetOpened"
        @show-link-token="showLinkToken"
      />
      <LinkCreationButton
        :live="props.live"
        product="movements"
        holder-type="business"
        :widget-opened="props.widgetOpened"
        @set-widget-opened="setWidgetOpened"
        @show-link-token="showLinkToken"
      />
    </div>
    <div class="mt-2 justify-center flex my-auto">
      <LinkCreationButton
        :live="props.live"
        product="invoices"
        holder-type="individual"
        :widget-opened="props.widgetOpened"
        @set-widget-opened="setWidgetOpened"
        @show-link-token="showLinkToken"
      />
      <LinkCreationButton
        :live="props.live"
        product="invoices"
        holder-type="business"
        :widget-opened="props.widgetOpened"
        @set-widget-opened="setWidgetOpened"
        @show-link="showLinkToken"
      />
    </div>
  </div>
</template>
