<template>
<div class="rounded-md font-semibold overflow-hidden bg-gray-900 shadow">
  <div class="grid grid-cols-3 relative bg-terminal-header p-2 bar ">
    <div class="dots justify-self-start pl-2">
      <div class="bg-red-500"></div>
      <div class="bg-yellow-500"></div>
      <div class="bg-green-500"></div>
    </div>
    <div class="font-semibold text-white">
      Terminal
    </div>
    <div class="justify-self-end">
      <font-awesome-icon
        icon="copy"
        @click="copyToClipboard"
        class="text-white cursor-pointer"/>
    </div>
  </div>
  <div class="text-white text-sm px-2 py-2 font-semibold h-1/2 bg-terminal-body">
      <slot />
  </div>
</div>
</template>

<script>
export default {
  methods: {
    copyToClipboard() {
      const linkTextInput = document.querySelector('#copy');
      linkTextInput.setAttribute('type', 'text');
      linkTextInput.select();
      document.execCommand('copy');
      linkTextInput.setAttribute('type', 'hidden');
    },
  },
};
</script>
<style scoped>

.dots {
  flex-flow: row nowrap;
}

.dots div {
  width: 9px;
  height: 9px;
  display: inline-block;
  margin-right: 5px;
  border-radius: 50%;
}

</style>
