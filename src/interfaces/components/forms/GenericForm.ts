import GenericForm from '@/components/forms/GenericForm.vue';

export type GenericFormPublicAPI = InstanceType<typeof GenericForm> & { valid: boolean }
