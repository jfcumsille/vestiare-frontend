<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as api from '@/api';
import { SIGNUP_ROUTE, HOME_ROUTE } from '@/constants/router';
import { useTranslation } from '@/locales';
import { OrganizationUserInvitation } from '@/interfaces/entities/organizationUser';
import { ButtonType } from '@/interfaces/utilities/enums';
import Auth0Panel from '@/views/login-signup/components/Auth0Panel.vue';
import GenericButton from '@/components/GenericButton.vue';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import Circle from '@/assets/svg/CircleBackground.vue';

const router = useRouter();
const route = useRoute();
const token = route.params.token;

const $t = useTranslation('views.invitations.login');
const props = defineProps<{
  organizationUser: OrganizationUserInvitation
}>();

const declineInvitation = async () => {
  await api.invitations.decline(token as string);
  router.push(HOME_ROUTE);
};

const adminName = computed(() => (props.organizationUser.adminName.includes('pending-name') ? '' : `Admin: ${props.organizationUser.adminName}`));

</script>
<template>
  <div
    data-test="login-view"
    class="py-2 px-10 h-full w-full flex justify-center"
  >
    <div class="relative">
      <div
        class="
        bg-white relative p-12 rounded-lg border space-y-6
        border-light-gray drop-shadow-md z-10 max-w-lg flex flex-col
      "
      >
        <div class="font-medium text-2xl text-heading-color text-center">
          {{ $t('title') }}
        </div>
        <div class="flex flex-col space-y-2 text-center">
          <p class="text-body-color text-3xl font-bold">
            {{ organizationUser.organizationName }}
          </p>
          <p class="text-body-color text-sm">
            {{ adminName }}
          </p>
        </div>
        <p class="text-body-color text-sm">
          {{ $t('pleaseLogin') }}
          <strong>{{ props.organizationUser.email }}</strong>
          {{ $t('throughAny') }}
        </p>
        <div class="flex flex-row bg-danger-surface p-2 rounded-lg">
          <WarningIcon
            class="ml-1 text-danger-main"
            fill="currentColor"
          />
          <div class="ml-2 text-body-color text-sm">
            <p class="font-sm">
              {{ $t('warning') }}
            </p>
          </div>
        </div>
        <Auth0Panel />
        <GenericButton
          :type="ButtonType.Text"
          :text="$t('decline')"
          @click="declineInvitation"
        />
        <p class="text-center text-body-color text-sm font-normal ">
          {{ $t('footer') }}
          <a
            :href="SIGNUP_ROUTE"
            class="text-primary-main hover:text-primary-hover"
          >
            {{ $t('signUp') }}
          </a>
        </p>
      </div>
      <Circle
        class="w-56 absolute top-0 right-0 -mr-20 -mt-10 z-0"
        fill="#F2F4FF"
        opacity="0.5"
      />
      <Circle
        class="w-40 absolute top-0 right-0 -mr-6 -mt-14 z-0"
        fill="#D7DDFF"
        opacity="0.5"
      />
      <Circle
        class="h-64 w-64 absolute bottom-0 left-0 -ml-20 z-0 -mb-16"
        fill="#F2F4FF"
        opacity="0.75"
      />
    </div>
  </div>
</template>
