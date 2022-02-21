import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import $router from '@/router';
import { setupLocales } from '@/locales';
import '@/assets/styles/tailwind.css';

setupLocales();

const app = createApp(App);

app.use(createPinia());
app.use($router);

app.mount('#app');
