<template>
<div>
  <div class="h-screen w-screen flex flex-col justify-center content-center flex-wrap">
    <div>
      <p class="error-text text-center">400</p>
    </div>

    <div class="text-gray-800 text-xl text-center">
      Ooops! Bad request
    </div>

    <div class="text-gray-800 mt-10 text-xl text-left opacity-50">
      context:
      <ul>
        <li v-if="hasValue('type')"> type: {{ error.type }} </li>
        <li v-if="hasValue('code')"> code: {{ error.code }} </li>
        <li v-if="hasValue('message')"> message: {{ error.message }} </li>
        <li v-if="hasValue('param')"> param: {{ error.param }} </li>
      </ul>

      <p class="mt-10">Please check the docs at <a class="border-b" href="https://fintoc.com/docs"> https://fintoc.com/docs </a ></p>
    </div>
  </div>

  <div class="absolute w-screen bottom-0 mb-10 text-center text-xl">
    <span class="opacity-50">Take me back to</span>
    <a class="border-b" href="/"> app.fintoc.com</a>
  </div>
</div>
</template>
<script>

export default {
  data() {
    return {
    };
  },
  props: {
    error: {
      type: Object,
      default: () => ({ type: 'invalid_request_error' }),
    },
  },
  methods: {
    hasValue(key) {
      return this.error[key] !== null && this.error[key] !== '' && this.error[key] !== undefined;
    },
  },
};
</script>

<style scoped>
  .error-text {
    font-size: 130px;
  }
</style>
