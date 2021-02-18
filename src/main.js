import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueClipboard from 'vue-clipboard2';
import ToggleButton from 'vue-js-toggle-button';

import { rutFilter, rutInputDirective } from 'vue-dni';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye, faEdit, faTrash, faPlus, faLock, faCog, faCopy, faBolt, faShieldAlt, faChevronLeft,
  faTimes, faBuilding, faUser, faDollarSign, faHandshake, faCheck, faKey, faUniversity,
  faMobile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';

library.add(
  faEye, faEdit, faPlus, faTrash, faLock, faCog, faCopy, faBolt, faShieldAlt, faChevronLeft,
  faTimes, faBuilding, faUser, faDollarSign, faHandshake, faCheck, faKey, faUniversity, faMobile,
);

Vue.use(VueClipboard);
Vue.use(ToggleButton);
Vue.use(Vuelidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.filter('rutFilter', rutFilter);
Vue.directive('rut', rutInputDirective);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
