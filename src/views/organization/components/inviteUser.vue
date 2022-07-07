<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from '@/locales';
import { Nullable } from '@/interfaces/common';
import { ButtonType, SizeType, Role } from '@/interfaces/utilities/enums';
import { GenericFormPublicAPI } from '@/interfaces/components/forms/GenericForm';
import { isValidEmail } from '@/utils/email';
import GenericForm from '@/components/forms/GenericForm.vue';
import GenericModal from '@/components/GenericModal.vue';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';

const emit = defineEmits<{(e: 'close'): void}>();
const $t = useTranslation('views.organization.members.newMember');

const close = () => emit('close');

const form = ref<Nullable<GenericFormPublicAPI>>(null);
const email = ref('');
const role = ref(Role.Member);

const roles = [Role.Admin, Role.Member];
const selectRole = (value: string) => {
  role.value = value as Role;
};

const emailValidations = [(value: string) => isValidEmail(value) || $t('invalidEmail') as string];

const inviteUser = () => {
  if (form.value?.valid) {
    console.log('inviting user. TODO: use store method')!;
  }
};

</script>

<template>
  <GenericModal
    :title="$t('title')"
    @close="close"
  >
    <div
      v-if="invitationSent"
      class="max-w-80 text-sm text-body-color space-y-6 flex flex-col"
    >
      <p>{{ $t('yourInvitationFor') }} <strong>{{ email }}</strong> {{ $t('hasBeenSent') }}</p>
      <p>{{ $t('inviteStatus') }}</p>
      <InvitationSent class="self-center" />
      <div class="w-full flex justify-end gap-2">
        <GenericButton
          :type="ButtonType.Text"
          :text="$t('backToTeam')"
          :disabled="loading"
          @click="close"
        />
        <GenericButton
          :type="ButtonType.Primary"
          :text="$t('inviteAnother')"
          :disabled="loading"
          :loading="loading"
          @click="inviteAnother"
        />
      </div>
    </div>
    <GenericForm
      v-else
      ref="form"
      class="max-w-80 text-sm text-body-color space-y-6"
    >
      <p> {{ $t('subtitle') }} </p>
      <GenericInput
        v-model="email"
        :size="SizeType.Large"
        :label="$t('emailLabel')"
        :placeholder="$t('emailPlaceholder')"
        :validations="emailValidations"
      />
      <GenericDropDown
        :label="$t('roleLabel')"
        :selected="role"
        :options="roles"
        :size="SizeType.Large"
        capitalize-options
        @select="selectRole"
      />
      <div class="w-full flex justify-end gap-2">
        <GenericButton
          :type="ButtonType.Text"
          :text="$t('cancel')"
          @click="close"
        />
        <GenericButton
          :type="ButtonType.Primary"
          :text="$t('sendInvitation')"
          @click="inviteUser"
        />
      </div>
    </GenericForm>
  </GenericModal>
</template>
