<template>
<div class="">
  <main class="h-screen">
    <div class="max-w-7xl mx-auto p-6 lg:p-8 relative">
      <div class="py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 flex flex-col">
        <widget-link-form v-if='isWidget'></widget-link-form>
        <dashboard-link-form v-else></dashboard-link-form>
        <div class="flex flex-col items-center justify-content mt-10">
          <router-link v-if="!isWidget" to="/links"
            class="text-center justify-content flex flex-col items-center
                     font-medium rounded-md bg-gray-500 text-white font-semibold
                     text-sm
                     text-white hover:bg-sub w-1/5 h-10 py-2">
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
