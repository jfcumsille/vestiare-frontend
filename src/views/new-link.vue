<template>
<div class="bg-gray-200">
  <main class="h-screen">
    <div class="max-w-7xl mx-auto p-6 lg:p-8 relative">
      <div class="py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 flex flex-col">
        <widget-link-form v-if='isWidget'></widget-link-form>
        <dashboard-link-form v-else></dashboard-link-form>
        <div class="mt-4 text-right">
          <router-link v-if="!isWidget" to="/links"
            class="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-gray-200
                    text-gray-900 hover:bg-gray-300">
            Volver
          </router-link>
        </div>
      </div>
    </div>
  </main>
</div>
</template>
<script>

import WidgetLinkForm from '../components/links/widget-link-form.vue';
import DashboardLinkForm from '../components/links/dashboard-link-form.vue';

export default {
  data() {
    return {
    };
  },
  props: {
    isWidget: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DashboardLinkForm,
    WidgetLinkForm,
  },
};
</script>
