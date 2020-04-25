<template>
<div>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link to="/">
              <img class="h-12" src="../assets/images/fintoc-logo-white.png" alt="Fintoc" />
            </router-link>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline">
              <router-link to="/links" active-class="bg-gray-900 text-white"
                  class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white
                         hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                Credenciales
              </router-link>
              <router-link to="/api-keys" active-class="bg-gray-900 text-white"
                 class="ml-4
                        px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white
                        hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                Api keys
              </router-link>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <a href="https://fintoc.com/docs"
               target="blank"
               class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white
                      hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
               Documentación
            </a>
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button class="max-w-xs flex items-center text-sm rounded-full text-white
                               focus:outline-none focus:shadow-solid"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                        @click="toggleShowDropDown">
                  <font-awesome-icon icon="cog" class="mr-1 text-xl"/>
                </button>
              </div>
              <transition name='drop-down-ease-out'>
                <div v-show='showDropDown'
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                  <div class="rounded-md bg-white shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu">
                    <button class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full
                                   text-left rounded-md"
                            role="menuitem"
                            @click='signOut'>
                      Salir
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400
                         hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700
                         focus:text-white"
                  @click="toggleShowDropDown">
            <svg class="block h-6 w-6"
                 stroke="currentColor"
                 fill="none"
                 viewBox="0 0 24 24"
                 v-show='!showDropDown'>
              <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="h-6 w-6 block"
                 stroke="currentColor"
                 fill="none"
                 viewBox="0 0 24 24"
                 v-show='showDropDown'>
              <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="md:hidden" v-show='showDropDown'>
      <div class="px-2 pt-2 pb-3 sm:px-3">
        <router-link to="/links" active-class="bg-gray-900 text-white"
            class="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white
                   hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
          Credenciales
        </router-link>
        <router-link to="/api-keys" active-class="bg-gray-900 text-white"
            class="mt-1
                   block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white
                   hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
          Api keys
        </router-link>
      </div>
      <div class="pt-3 pb-3 border-t border-gray-700">
        <div class="px-2">
          <a href="https://fintoc.com/docs"
             target="blank"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
                    hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
                    focus:bg-gray-700"
                  @click='signOut'>
            Documentación
          </a>
          <a href='#'
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
                    hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
                    focus:bg-gray-700"
             @click='signOut'>
            Salir
          </a>
        </div>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  data() {
    return {
      showDropDown: false,
    };
  },
  methods: {
    toggleShowDropDown() {
      this.showDropDown = !this.showDropDown;
    },
    signOut() {
      this.$store.dispatch('signOut').then(() => {
        this.$router.push('/login');
      });
    },
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
}

.drop-down-ease-out-leave-to {
  opacity: 0;
  scale: 95;
}
</style>
