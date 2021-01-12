<template>
<div class="grid grid-cols-6 justify-center items-center w-full text-xs h-12">
  <div class="movement-text">
    {{ date }}
  </div>
  <div class="movement-text">
    {{ description }}
  </div>
  <div class="movement-text"
        v-bind:class="{ 'text-red-500': !inbound, 'text-green-500': inbound }">
    {{ amount }}
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    movement: {
      type: Object,
    },
  },
  computed: {
    date() {
      return moment(this.movement.postDate).format('YYYY-MM-DD');
    },
    inbound() {
      return this.movement.amount > 0;
    },
    amount() {
      return new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(Math.abs(this.movement.amount));
    },
    description() {
      return this.movement.description;
    },
  },
};
</script>

<style scoped>
.movement-text {
  @apply col-span-2;
  @apply text-center;
  @apply content-center;
}

</style>
