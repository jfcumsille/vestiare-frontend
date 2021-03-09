<template>
  <component :is="tag"
          v-bind="$attrs"
          type="submit"
          class="group relative w-full flex justify-center py-4 px-4 border
                  border-transparent text-sm leading-5 font-medium rounded-md
                  text-white bg-main focus:outline-none transition duration-150
                  ease-in-out focus:opacity-50"
          :class="{
            'hover:opacity-50': !invalidForm, 'cursor-not-allowed': invalidForm,
            'bg-main': !widget, 'bg-fintoc-blue': widget, 'opacity-50': isDisabled
          }">
    <span
      class="absolute left-0 inset-y-0 flex items-center
             pl-3 text-white opacity-25 transition
             ease-in-out duration-150">
      <svg v-if="hasLockIcon"
           class="h-5 w-5"
           fill="currentColor"
           viewBox="0 0 20 20">
        <path fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0
                 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd" />
      </svg>
      <div v-else class="h-5 w-5">
        <slot name="icon" />
      </div>
    </span>
    <slot>
    </slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: { type: String, default: 'button' },
    hasLockIcon: Boolean,
    invalidForm: Boolean,
    widget: Boolean,
    isDisabled: Boolean,
  },
};
</script>
