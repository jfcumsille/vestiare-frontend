<template>
<div class="">
  <main class="h-screen">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <invalid-request :error='error' v-if="is400"></invalid-request>
    </div>
  </main>
</div>
</template>
<script>

import InvalidRequest from '../components/errors/invalid-request.vue';

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
    error: {
      type: Object,
      default: () => ({ type: 'invalid_request_error' }),
    },
  },
  components: {
    InvalidRequest,
  },
  computed: {
    is400() {
      return this.error.type === 'invalid_request_error';
    },
  },
};
</script>
