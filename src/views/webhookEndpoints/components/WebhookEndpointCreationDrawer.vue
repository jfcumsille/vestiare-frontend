<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { useConfigStore } from '@/stores/config';
import { WebhookEvent } from '@/interfaces/entities/webhookEndpoints';
import { SizeType, Mode, Product } from '@/interfaces/utilities/enums';
import { GenericFormPublicAPI } from '@/interfaces/components/forms/GenericForm';
import { Nullable } from '@/interfaces/common';
import { isValidHttpsUrl } from '@/utils/validations';
import { trackWebhookCreated } from '@/services/analytics';
import {
  MOVEMENT_EVENTS,
  SUBSCRIPTION_INTENT_EVENTS,
  PAYMENT_EVENTS,
  INVOICES_EVENTS,
} from '@/constants/webhookEvents';
import { DOCS_EVENTS } from '@/constants/urls';
import GenericForm from '@/components/forms/GenericForm.vue';
import GenericDrawer from '@/components/GenericDrawer.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericTextArea from '@/components/forms/GenericTextArea.vue';
import GenericCheckbox from '@/components/GenericCheckbox.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const $t = useTranslation('views.webhookEndpoints.creation');
const webhookEndpointsStore = useWebhookEndpointsStore();
const configStore = useConfigStore();

const isLive = computed(() => configStore.mode === Mode.Live);

const selectedProduct = ref<string>(Product.Movements);

const eventNames = computed(() => {
  switch (selectedProduct.value) {
    case Product.Movements:
      return MOVEMENT_EVENTS;
    case Product.SubscriptionIntents:
      return SUBSCRIPTION_INTENT_EVENTS;
    case Product.Payments:
      return PAYMENT_EVENTS;
    case Product.Invoices:
      return INVOICES_EVENTS;
    default:
      return [];
  }
});
const eventDescription = (name: string) => $t(`checkBox.descriptions.${name}`);

const url = ref('');
const description = ref('');
const webhookEndpointName = ref('');
const events = ref<Array<WebhookEvent>>(
  eventNames.value.map((name) => ({ name, checked: false })),
);
const selectedEvents = ref<Array<WebhookEvent>>([]);
const selectAllEvents = ref(false);
const loading = ref(false);

const eventsError = ref('');

const formRef = ref<Nullable<GenericFormPublicAPI>>(null);

const urlValidations = [
  (value: string) => !!value.trim() || $t('validations.url.emptyUrl') as string,
  (value: string) => (
    isValidHttpsUrl(value) || $t('validations.url.invalidUrl') as string
  ),
];

const nameValidations = [(value: string) => !!value.trim() || $t('validations.name.required') as string];

const areValidEvents = () => {
  if (selectedEvents.value.some((event) => event.checked)) {
    return true;
  }
  eventsError.value = $t('validations.events.requireEvent');
  return false;
};

const getEventNames = (webhookEvents: Array<WebhookEvent>) => (
  webhookEvents.map((event) => event.name)
);

const createWebhookEndpoint = async () => {
  const formIsValid = formRef.value?.valid;
  const eventsAreValid = areValidEvents();
  if (formIsValid && eventsAreValid) {
    loading.value = true;
    const selectedEventNames = getEventNames(selectedEvents.value);
    await webhookEndpointsStore.createWebhookEndpoint(
      {
        url: url.value,
        name: webhookEndpointName.value,
        description: description.value.trim() === '' ? undefined : description.value,
        enabledEvents: selectedEventNames,
      },
    );
    loading.value = false;
    emit('close');
    trackWebhookCreated(selectedEventNames);
  }
};

watch(() => selectedEvents.value, () => { eventsError.value = ''; });

const productOptions = [
  Product.Movements,
  Product.Payments,
  Product.SubscriptionIntents,
  Product.Invoices,
];

const updateEvents = () => {
  const selectedEventNames = getEventNames(selectedEvents.value);
  const updatedEvents = eventNames.value.map((name) => {
    const checkValue = selectedEventNames.includes(name);
    return { name, checked: checkValue };
  });
  events.value = updatedEvents;
};

const selectProduct = (value: string) => {
  selectedProduct.value = value as Product;
  updateEvents();
  selectAllEvents.value = false;
};

const removeSelectedEvent = (event: WebhookEvent) => {
  selectedEvents.value = selectedEvents.value.filter(
    (selEvent) => selEvent.name !== event.name,
  );
};

const updateSelectedEvents = (event: WebhookEvent) => {
  if (event.checked) {
    selectedEvents.value = [...selectedEvents.value, event];
  } else {
    removeSelectedEvent(event);
    selectAllEvents.value = false;
  }
};

const handleAlreadySelectedCheckbox = (event: WebhookEvent) => {
  removeSelectedEvent(event);
  updateEvents();
};

const getUnselectedEvents = (): Array<WebhookEvent> => {
  const unselected: Array<WebhookEvent> = [];
  events.value.forEach((event) => {
    if (!event.checked) {
      unselected.push({ ...event, checked: true });
    }
  });
  return unselected;
};

const handleSelectAllEvents = () => {
  if (selectAllEvents.value) {
    const unselectedEvents = getUnselectedEvents();
    selectedEvents.value = [...selectedEvents.value, ...unselectedEvents];
    const checkedEvents = eventNames.value.map((name) => ({ name, checked: true }));
    events.value = checkedEvents;
  } else {
    events.value.forEach((event) => {
      removeSelectedEvent(event);
    });
    const uncheckedEvents = eventNames.value.map((name) => ({ name, checked: false }));
    events.value = uncheckedEvents;
  }
};
</script>

<template>
  <GenericDrawer
    :title="`${$t('modalTitle')} ${isLive ? 'Live' : 'Test' } Webhook Endpoint`"
    :button-title="$t('buttonText')"
    :open="props.open"
    @close="emit('close')"
    @done="createWebhookEndpoint"
  >
    <GenericForm
      ref="formRef"
    >
      <GenericInput
        v-model="webhookEndpointName"
        :size="SizeType.XLarge"
        :label="$t('form.name.label')"
        :placeholder="$t('form.name.placeholder')"
        :validations="nameValidations"
      />
      <GenericTextArea
        v-model="description"
        :size="SizeType.XLarge"
        :label="$t('form.description.label')"
        :placeholder="$t('form.description.placeholder')"
      />
      <GenericInput
        v-model="url"
        :size="SizeType.XLarge"
        :label="$t('form.url.label')"
        :placeholder="$t('form.url.placeholder')"
        :hint="$t('form.url.hint')"
        right-text="webhook.site →"
        right-href="https://webhook.site/"
        :validations="urlValidations"
      />
      <div class="flex flex-row justify-between mt-16">
        <div class="text-sm font-medium text-body-color">
          {{ $t('checkBox.checkAll') }}
        </div>
        <a
          class="font-medium text-primary-main text-xs hover:text-primary-hover ml-2"
          tabIndex="-1"
          target="_blank"
          rel="noopener noreferrer"
          :href="DOCS_EVENTS"
        >
          {{ $t('checkBox.learnMore') }}
        </a>
      </div>
      <div class="flex flex-row space-x-8">
        <div class="space-y-4 mt-8 min-w-xs max-w-xs pb-2">
          <GenericCheckbox
            v-model="selectAllEvents"
            :text="$t('checkBox.selectAll')"
            @change="handleSelectAllEvents"
          />
          <GenericDropDown
            data-test=""
            :label="$t('checkBox.viewEvents')"
            :selected="selectedProduct"
            :options="productOptions"
            :size="SizeType.Medium"
            @select="selectProduct"
          />
          <div
            class="text-sm font-medium text-body-color"
          >
            {{ $t('checkBox.onlyAvailable') }}
            <span class="capitalize"> {{ selectedProduct }} </span> Plan:
          </div>
          <GenericCheckbox
            v-for="event in events"
            :key="event.name"
            v-model="event.checked"
            :text="event.name"
            :description="eventDescription(event.name)"
            @change="updateSelectedEvents(event)"
          />
        </div>
        <div class="bg-divider-color w-px" />
        <div class="space-y-4 mt-8 min-w-xxs max-w-xxs">
          <div class="text-sm font-medium text-body-color">
            {{ $t('checkBox.chosenEvents') }}
          </div>
          <GenericCheckbox
            v-for="event in selectedEvents"
            :key="event.name"
            v-model="event.checked"
            :text="event.name"
            @change="handleAlreadySelectedCheckbox(event)"
          />
        </div>
      </div>
      <p
        v-if="eventsError"
        class="mt-1 text-sm font-bold text-danger-main"
      >
        {{ eventsError }}
      </p>
    </GenericForm>
  </GenericDrawer>
</template>
