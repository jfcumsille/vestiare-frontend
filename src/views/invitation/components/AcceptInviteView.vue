<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';
import * as api from '@/api';
import { LOGIN_ROUTE, HOME_ROUTE } from '@/constants/router';
import { useTranslation } from '@/locales';
import { OrganizationUserInvitation } from '@/interfaces/entities/organizationUser';
import { ButtonType, SizeType } from '@/interfaces/utilities/enums';
import Auth0Panel from '@/views/login-signup/components/Auth0Panel.vue';
import GenericButton from '@/components/GenericButton.vue';
import WarningIcon from '@/assets/svg/WarningIcon.vue';
import Circle from '@/assets/svg/CircleBackground.vue';

const props = defineProps<{
  organizationUser: OrganizationUserInvitation
}>();

const emit = defineEmits<{(e: 'accept-invitation-with-email'): void }>();

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();
const token = route.params.token;

const $t = useTranslation('views.invitations.login');

const acceptInvitation = async () => {
  await api.invitations.accept(token as string);
  await userStore.loadUser();
  await router.push(HOME_ROUTE);
};
const declineInvitation = async () => {
  await api.invitations.decline(token as string);
  await router.push(HOME_ROUTE);
};

const adminName = computed(() => (props.organizationUser.adminName.includes('pending-name') ? '' : `Admin: ${props.organizationUser.adminName}`));

const goToLogIn = async () => {
  await api.invitations.accept(token as string);
  router.push(LOGIN_ROUTE);
};
const logOut = async () => {
  await userStore.logOut();
};

const isOrgUserLoggedIn = ref(false);
const isDifferentUserLoggedIn = ref(false);
const isLoggedOut = computed(() => !isDifferentUserLoggedIn.value && !isOrgUserLoggedIn.value);

const title = computed(() => (
  isDifferentUserLoggedIn.value ? $t('titleNotInvited') : $t('title')
));

onMounted(() => {
  if (userStore.authenticated && userStore.user) {
    if (userStore.user.email === props.organizationUser.email) {
      isOrgUserLoggedIn.value = true;
    } else {
      isDifferentUserLoggedIn.value = true;
    }
  }
});
</script>
<template>
  <div
    data-test="login-view"
    class="p-10 h-full w-full flex justify-center"
  >
    <div class="relative">
      <div
        class="
        bg-white relative p-12 rounded-lg border space-y-6
        border-light-gray drop-shadow-md z-10 max-w-lg flex flex-col
      "
      >
        <div class="font-medium text-2xl text-heading-color text-center">
          {{ title }}
        </div>
        <div
          v-if="isDifferentUserLoggedIn"
          class="flex flex-col space-y-6"
        >
          <div class="space-y-2 text-body-color text-sm">
            <p>
              {{ $t('thisInvitation') }}
              <strong>{{ props.organizationUser.email }}</strong>
              {{ $t('loggedInWith') }}
              <strong v-if="userStore.user">{{ userStore.user.email }}</strong>.
            </p>
            <p>
              {{ $t('pleaseLogOut') }}
            </p>
          </div>
          <GenericButton
            :type="ButtonType.Primary"
            text="Log Out"
            @click="logOut"
          />
        </div>
        <div
          v-if="!isDifferentUserLoggedIn"
          class="flex flex-col space-y-2 text-center"
        >
          <p class="text-body-color text-xl font-bold">
            {{ organizationUser.organizationName }}
          </p>
          <p class="text-body-color text-sm">
            {{ adminName }}
          </p>
        </div>
        <div
          v-if="!isDifferentUserLoggedIn"
          class="flex flex-row bg-danger-surface p-2 rounded-lg"
        >
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
        <p
          v-if="isLoggedOut"
          class="text-body-color text-sm"
        >
          {{ $t('pleaseSignUp') }}
          <strong>{{ props.organizationUser.email }}</strong>
          {{ $t('throughAny') }}
        </p>
        <GenericButton
          v-if="isOrgUserLoggedIn"
          :type="ButtonType.Primary"
          text="Accept Invitation"
          @click="acceptInvitation"
        />
        <Auth0Panel
          v-if="isLoggedOut"
          is-signup
          is-invitation
          @accept-invitation-with-email="() => emit('accept-invitation-with-email')"
        />
        <GenericButton
          v-if="!isDifferentUserLoggedIn"
          :type="ButtonType.Text"
          :text="$t('decline')"
          @click="declineInvitation"
        />
        <div
          v-if="isLoggedOut"
          class="flex flex-col justify-center items-center"
        >
          <p class="text-center text-body-color text-base font-normal">
            {{ $t('footer') }}
          </p>
          <GenericButton
            :type="ButtonType.Text"
            :size="SizeType.Inline"
            :text="$t('logIn')"
            @click="goToLogIn"
          />
        </div>
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
