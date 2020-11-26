<template>
<div class="absolute z-10 inset-0 overflow-y-auto bg-gray-700 bg-opacity-75">
  <div class="flex h-screen items-center justify-center py-4 px-4 text-center">
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
                shadow-xl
                sm:w-full">
      <slot />
    </div>
  </div>
</div>
</template>
