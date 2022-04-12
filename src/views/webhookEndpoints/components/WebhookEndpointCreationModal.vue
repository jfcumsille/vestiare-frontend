<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTranslation } from '@/locales';
import { useWebhookEndpointsStore } from '@/stores/webhookEndpoints';
import { Mode } from '@/interfaces/utilities/enums';
import { GenericFormPublicAPI } from '@/interfaces/components/forms/GenericForm';
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
const nameError = ref('');

const form = ref<GenericFormPublicAPI | null>(null);
const urlValidations = [
  (value: string) => !!value.trim() || 'No empty URL',
  (value: string) => (
    /^https:\/\/[^ ".]+\.[^ "]+$/.test(value) || $t('validations.url.invalidUrl') as string
  ),
];

const areValidEvents = () => {
  if (events.value.some((event) => event.checked)) {
    return true;
  }
  eventsError.value = $t('validations.events.requireEvent');
  return false;
};

const isValidName = () => {
  if (name.value) {
    nameError.value = '';
    return true;
  }
  nameError.value = $t('validations.name.required');
  return false;
};

const createWebhookEndpoint = async () => {
  const urlIsValid = form.value?.valid;
  const eventsAreValid = areValidEvents();
  const nameIsValid = isValidName();
  if (urlIsValid && eventsAreValid && nameIsValid) {
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
  }
};

watch(() => name.value, () => { nameError.value = ''; });
watch(() => events.value, () => { eventsError.value = ''; });
</script>

<template>
  <GenericModal
    :title="$t('modalTitle')"
    @close="emit('close')"
  >
    <div class="space-y-3">
      <GenericInput
        ref="urlInput"
        v-model="url"
        :label="$t('form.url.label')"
        :placeholder="$t('form.url.placeholder')"
        :validate="urlValidations"
      />
      <GenericInput
        v-model="name"
        :label="$t('form.name.label')"
        :placeholder="$t('form.name.placeholder')"
        :error="nameError"
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
    </div>
    <div class="w-full flex justify-end">
      <button
        :disabled="loading"
        type="button"
        class="
          py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white
          rounded-lg border border-gray-200 hover:bg-gray-100
          hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700
          focus:text-blue-700 inline-flex items-center
        "
        :class="{ 'opacity-50': loading }"
        @click="createWebhookEndpoint"
      >
        {{ $t('buttonText') }}
      </button>
    </div>
  </GenericModal>
</template>
