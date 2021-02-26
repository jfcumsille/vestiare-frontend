<template>
  <div>
    <div class="relative inline-block">
      <div>
        <button
          type="button"
          v-on:blur="updateSelecting()"
          @click="updateSelecting()"
          class="flex justify-between max-h-1.5 w-32 sm:rounded-md border border-gray-300 px-4
            py-2 bg-white text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none
            items-center"
        >
          <span>{{ options[selected] || title }}</span>
          <arrow-down-icon/>
        </button>
      </div>
      <transition name="drop-down-ease-out">
        <div v-if="selecting"
            class="origin-top-right absolute right-100 mt-2 w-32 rounded-md shadow-lg bg-white
                z-10">
            <div
            v-for="key in Object.keys(options)" :key="key"
            class="py-1"
            >
                <div
                    @click="selectItem(key)"
                    class="w-32 block px-4 py-2 text-base text-gray-900 hover:bg-gray-100
                        hover:text-gray-900">
                    {{ options[key] }}
                </div>
            </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ArrowDownIcon from './arrow-down-icon.vue';

export default {

  data() {
    return {
      selecting: false,
    };
  },

  methods: {
    selectItem(key) {
      this.selecting = false;
      if (this.selected !== key) {
        this.onSelection(key, this.filterKey);
      }
    },

    updateSelecting() {
      const currentValue = this.selecting;
      this.selecting = !currentValue;
    },
  },

  props: {
    title: String,
    dropdown: Boolean,
    options: Object,
    selected: String,
    onSelection: Function,
    filterKey: String,
  },

  components: {
    ArrowDownIcon,
  },
};
</script>

<style scoped>
.drop-down-ease-out-enter {
  opacity: 0;
  scale: 95;
}

.drop-down-ease-out-enter-active, .drop-down-ease-out-leave-active{
  scale: 100;
  transition: all .1s ease;
  opacity: 100;
}

.drop-down-ease-out-leave-to {
  opacity: 0;
  scale: 95;
}
</style>
