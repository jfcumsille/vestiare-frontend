import GenericInput from '@/components/forms/GenericInput.vue';

export type GenericInputPublicAPI = InstanceType<typeof GenericInput>
  & { valid: boolean, validating: boolean }
