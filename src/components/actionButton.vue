<template>
  <button type="submit"
          class="group relative w-full flex justify-center py-4 px-4 border
                  border-transparent text-sm leading-5 font-medium rounded-md
                  text-white fintoc-blue focus:outline-none transition duration-150
                  ease-in-out focus:opacity-50"
          :class="{ 'hover:opacity-50': !invalidForm, 'cursor-not-allowed': invalidForm }">
    <span
      v-if='hasLockIcon'
      class="absolute left-0 inset-y-0 flex items-center pl-3">
      <svg class="h-5 w-5 text-white opacity-25 transition ease-in-out duration-150"
           fill="currentColor"
           viewBox="0 0 20 20">
        <path fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0
                 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd" />
      </svg>
    </span>
    <slot>
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    hasLockIcon: Boolean,
    invalidForm: Boolean,
  },
};
</script>
