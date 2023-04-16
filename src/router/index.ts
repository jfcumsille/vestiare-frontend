import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {
  HOME_ROUTE,
  DRESSES_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  PASSWORD_RESET_ROUTE,
  OAUTH_LOGIN_ROUTE,
  OAUTH_SIGNUP_ROUTE,
  PROFILE_ROUTE,
  ORGANIZATION_ROUTE,
  INVITATION_ROUTE,
} from '@/constants/router';
import LogInView from '@/views/login-signup/LogInView.vue';
import SignUpView from '@/views/login-signup/SignUpView.vue';
import ResetPasswordView from '@/views/login-signup/ResetPasswordView.vue';
import ProfileView from '@/views/profile/ProfileView.vue';
import OrganizationView from '@/views/organization/OrganizationView.vue';
import InvitationView from '@/views/invitation/InvitationView.vue';
import DressesView from '@/views/dresses/DressesView.vue';

import { enableLoader, disableLoader } from './loader';
import {
  loadUser,
  loginRequired,
  skipLogInIfAlreadyLoggedIn,
  skipSignUpIfAlreadyLoggedIn,
  skipResetPasswordIfAlreadyLoggedIn,
  removeTrailingSlash,
} from './guards';
import { handleAuth0RedirectCallback } from './handlers';

const routes: RouteRecordRaw[] = [
  { path: HOME_ROUTE, redirect: () => ({ path: DRESSES_ROUTE }) },
  {
    path: OAUTH_LOGIN_ROUTE,
    component: LogInView,
    beforeEnter: handleAuth0RedirectCallback,
  },
  {
    path: OAUTH_SIGNUP_ROUTE,
    component: SignUpView,
    beforeEnter: handleAuth0RedirectCallback,
  },
  {
    path: LOGIN_ROUTE,
    component: LogInView,
    beforeEnter: skipLogInIfAlreadyLoggedIn,
  },
  {
    path: SIGNUP_ROUTE,
    component: SignUpView,
    beforeEnter: skipSignUpIfAlreadyLoggedIn,
  },
  {
    path: PASSWORD_RESET_ROUTE,
    component: ResetPasswordView,
    beforeEnter: [
      skipResetPasswordIfAlreadyLoggedIn,
    ],
  },
  { path: DRESSES_ROUTE, component: DressesView },
  { path: PROFILE_ROUTE, component: ProfileView },
  { path: ORGANIZATION_ROUTE, component: OrganizationView },
  { path: INVITATION_ROUTE, component: InvitationView },
  { path: '/:pathMatch(.*)*', redirect: () => ({ path: DRESSES_ROUTE }) },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

enableLoader(router);

router.beforeEach(removeTrailingSlash);
router.beforeEach(loadUser);
router.beforeEach(loginRequired);

disableLoader(router);

export default router;
