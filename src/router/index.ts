import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {
  HOME_ROUTE,
  API_KEYS_ROUTE,
  LINKS_ROUTE,
  WEBHOOK_ENDPOINTS_ROUTE,
  DETAILED_WEBHOOK_ENDPOINT_VIEW,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  PASSWORD_RESET_ROUTE,
  OAUTH_LOGIN_ROUTE,
  OAUTH_SIGNUP_ROUTE,
} from '@/constants/router';
import LogInView from '@/views/login-signup/LogInView.vue';
import SignUpView from '@/views/login-signup/SignUpView.vue';
import ResetPasswordView from '@/views/login-signup/ResetPasswordView.vue';
import ApiKeysView from '@/views/apiKeys/ApiKeysView.vue';
import LinksView from '@/views/links/LinksView.vue';
import WebhookEndpointsView from '@/views/webhookEndpoints/WebhookEndpointsView.vue';
import DetailedWebhookEndpointView from '@/views/webhookEndpoints/DetailedWebhookEndpointView.vue';

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
  { path: HOME_ROUTE, redirect: () => ({ path: LINKS_ROUTE }) },
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
  { path: API_KEYS_ROUTE, component: ApiKeysView },
  { path: LINKS_ROUTE, component: LinksView },
  { path: WEBHOOK_ENDPOINTS_ROUTE, component: WebhookEndpointsView },
  {
    path: DETAILED_WEBHOOK_ENDPOINT_VIEW,
    component: DetailedWebhookEndpointView,
  },
  { path: '/:pathMatch(.*)*', redirect: () => ({ path: LINKS_ROUTE }) },
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
