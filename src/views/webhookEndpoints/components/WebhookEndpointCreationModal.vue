<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { Mode } from '@/interfaces/utilities/enums';
import { GenericFormPublicAPI } from '@/interfaces/components/forms/GenericForm';
import { Nullable } from '@/interfaces/common';
import { WEBHOOK_ENDPOINT_CREATED } from '@/constants/analyticsEvents';
import { track } from '@/services/analytics';
import GenericForm from '@/components/forms/GenericForm.vue';
import GenericModal from '@/components/GenericModal.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericTextArea from '@/components/forms/GenericTextArea.vue';
import GenericCheckbox from '@/components/GenericCheckbox.vue';

const props = defineProps<{ live: boolean }>();

const emit = defineEmits<{ (e: 'close'): void }>();

const eventNames = [
  'link.credentials_changed',
  'payment_intent.succeeded',
  'payment_intent.failed',
  'account.refresh_intent.succeeded',
  'link.refresh_intent.succeeded',
  'account.refresh_intent.failed',
  'payment_intent.rejected',
  'link.refresh_intent.failed',
  'account.refresh_intent.rejected',
];

const $t = useTranslation('views.webhookEndpoints.creation');
const webhookEndpointsStore = useWebhookEndpointsStore();

const url = ref('');
const description = ref('');
const name = ref('');
const events = ref(eventNames.map((eventName) => ({ eventName, checked: false })));
const loading = ref(false);

const eventsError = ref('');

const formRef = ref<Nullable<GenericFormPublicAPI>>(null);

const URL_VALIDATION_REGEX = /^https:\/\/[^ ".]+\.[^ "]+$/;
const urlValidations = [
  (value: string) => !!value.trim() || $t('validations.url.emptyUrl') as string,
  (value: string) => (
    URL_VALIDATION_REGEX.test(value) || $t('validations.url.invalidUrl') as string
  ),
];

const nameValidations = [(value: string) => !!value.trim() || $t('validations.name.required') as string];

const areValidEvents = () => {
  if (events.value.some((event) => event.checked)) {
    return true;
  }
  eventsError.value = $t('validations.events.requireEvent');
  return false;
};

const createWebhookEndpoint = async () => {
  const formIsValid = formRef.value?.valid;
  const eventsAreValid = areValidEvents();
  if (formIsValid && eventsAreValid) {
    loading.value = true;
    await webhookEndpointsStore.createWebhookEndpoint(
      {
        url: url.value,
        name: name.value,
        description: description.value.trim() === '' ? undefined : description.value,
        enabledEvents: events.value.filter(
          (event) => event.checked,
        ).map((event) => event.eventName),
      },
      props.live ? Mode.Live : Mode.Test,
    );
    loading.value = false;
    emit('close');
    track(WEBHOOK_ENDPOINT_CREATED, {
      enabled_events: events.value.filter((event) => event.checked).map((event) => event.name),
      origin: 'dashboard',
    });
  }
};

watch(() => events.value, () => { eventsError.value = ''; });
</script>

<template>
  <GenericModal
    :title="$t('modalTitle')"
    @close="emit('close')"
  >
    <GenericForm
      ref="formRef"
      class="space-y-3"
    >
      <GenericInput
        v-model="url"
        :label="$t('form.url.label')"
        :placeholder="$t('form.url.placeholder')"
        :validations="urlValidations"
      />
      <GenericInput
        v-model="name"
        :label="$t('form.name.label')"
        :placeholder="$t('form.name.placeholder')"
        :validations="nameValidations"
      />
      <GenericTextArea
        v-model="description"
        :label="$t('form.description.label')"
        :placeholder="$t('form.description.placeholder')"
      />
      <p class="text-xl">
        {{ $t('events') }}
      </p>
      <GenericCheckbox
        v-for="event in events"
        :key="event.eventName"
        v-model="event.checked"
        :text="event.eventName"
      />
      <p
        v-if="eventsError"
        class="mt-1 text-sm font-bold text-danger-main"
      >
        {{ eventsError }}
      </p>
    </GenericForm>
    <div class="w-full flex justify-end">
      <button
        data-test="create-webhook-button"
        :disabled="loading"
        type="button"
        class="
          py-2.5 px-5 mr-2 text-sm font-medium text-heading-color bg-white
          rounded-lg border border-gray-200 hover:bg-light-gray
        hover:text-primary-main focus:z-10 focus:ring-2 focus:ring-primary-focus
        focus:text-primary-main inline-flex items-center min-w-max ml-6
        "
        :class="{ 'opacity-50': loading }"
        @click="createWebhookEndpoint"
      >
        {{ $t('buttonText') }}
      </button>
    </div>
  </GenericModal>
</template>
