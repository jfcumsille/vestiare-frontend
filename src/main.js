import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueClipboard from 'vue-clipboard2';
import ToggleButton from 'vue-js-toggle-button';

import { rutFilter, rutInputDirective } from 'vue-dni';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye, faEdit, faTrash, faPlus, faLock, faCog, faCopy, faBolt, faShieldAlt, faChevronLeft,
  faTimes, faBuilding, faUser, faDollarSign, faHandshake, faCheck, faKey, faUniversity,
  faMobile, faExclamationCircle, faQuestion, faSearch, faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { InlineSvgPlugin } from 'vue-inline-svg';

import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';

moment.locale('es-cl');

library.add(
  faEye, faEdit, faPlus, faTrash, faLock, faCog, faCopy, faBolt, faShieldAlt, faChevronLeft,
  faTimes, faBuilding, faUser, faDollarSign, faHandshake, faCheck, faKey, faUniversity, faMobile,
  faExclamationCircle, faQuestion, faSearch, faShare,
);

Vue.use(VueClipboard);
Vue.use(ToggleButton);
Vue.use(Vuelidate);
Vue.use(InlineSvgPlugin);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.filter('rutFilter', rutFilter);
Vue.directive('rut', rutInputDirective);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
