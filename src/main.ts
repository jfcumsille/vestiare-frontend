import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import { setupLocales } from '@/locales';
import { setupAPIAuthInterceptors } from '@/api/setup';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import '@/assets/styles/tailwind.css';
import { APP_ENVIRONMENT, SENTRY_DSN } from '@/constants/sentry';

setupLocales();

const app = createApp(App);

app.use(createPinia());
app.use(router);

Sentry.init({
  app,
  dsn: SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
  ],
  environment: APP_ENVIRONMENT,
  tracesSampleRate: 1.0,
});

setupAPIAuthInterceptors();

app.mount('#app');
