<template>
  <div class="py-6 px-6 text-gray-700 text-l flex flex-wrap">
    <div class="w-1/5 text-left">
      <slot name="backButton"></slot>
    </div>
    <div class="w-3/5 text-center text-gray-800">
      <slot name="currentStepText"></slot>
    </div>
    <div class="w-1/5 text-right">
      <slot name="closeButton"></slot>
    </div>
  </div>
</template>
