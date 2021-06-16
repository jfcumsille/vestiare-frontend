<template>
<div>
  <nav>
    <div class="w-screen mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <router-link to="/">
              <img class="h-8" src="../assets/images/imagotipo.svg" alt="Fintoc" />
            </router-link>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline">
              <router-link to="/links" active-class="text-main font-semibold"
                  class="px-3 py-2 mt-2
                  rounded-md text-base font-medium text-gray-800 hover:text-main
                         focus:outline-none active:text-main">
                Links
              </router-link>
              <router-link to="/api-keys" active-class="text-main font-semibold"
                  class="ml-4
                  px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-main
                         focus:outline-none active:text-main">
                Api keys
              </router-link>
              <router-link to="/webhooks" active-class="text-main font-semibold"
                  class="ml-4
                  px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-main
                         focus:outline-none active:text-main">
                Webhooks
              </router-link>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6 mt-2">
            <a href="https://blog.fintoc.com"
               target="blank"
               class="px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-main
                         focus:outline-none active:text-main">
               Blog
            </a>
            <a href="https://docs.fintoc.com/"
               target="blank"
               class="ml-4
                      px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-main
                         focus:outline-none active:text-main">
               Documentación
            </a>
            <!-- Profile dropdown -->
            <div class="ml-3 z-30 relative">
              <div>
                <button class="
                  px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-main
                  focus:outline-none active:text-main"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                        @click="toggleShowDropDown"
                        active-class="text-main font-semibold">
                  Configuración
                </button>
              </div>
              <transition name='drop-down-ease-out'>
                <div
                    v-show='showDropDown'
                    class="origin-top-right absolute right-0 mr-1 mt-2 w-48 rounded-md shadow-lg">
                  <router-link
                      to="/user-profile"
                      class="block px-4 py-2 text-base text-gray-800 hover:text-main w-full
                             text-left rounded-t-md bg-white font-medium"
                  >
                    Mi perfil
                  </router-link>
                  <div class="rounded-b-md bg-white shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu">
                    <button class="block px-4 py-2 text-base text-gray-800 hover:text-main w-full
                                   text-left font-medium"
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
        <router-link to="/links" active-class="text-main font-semibold"
            class="block px-3 py-2 rounded-md text-base font-semibold text-gray-300 hover:text-white
                   hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
          Links
        </router-link>
        <router-link to="/api-keys" active-class="text-main font-semibold"
            class="mt-1
                   block px-3 py-2 rounded-md text-base font-semibold text-gray-300 hover:text-white
                   hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
          Api keys
        </router-link>
        <router-link to="/webhooks" active-class="text-main font-semibold"
            class="mt-1
                   block px-3 py-2 rounded-md text-base font-semibold text-gray-300 hover:text-white
                   hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
          Webhooks
        </router-link>
        <router-link
            to="/user-profile"
            active-class="text-main font-semibold"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
                  focus:outline-none"
        >
          Mi perfil
        </router-link>
      </div>
      <div class="pt-3 pb-3 border-t border-gray-700">
        <div class="px-2">
          <a href="https://blog.fintoc.com"
             target="blank"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
                    hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
                    focus:bg-gray-700">
            Blog
          </a>
          <a href="https://docs.fintoc.com/"
             target="blank"
             class="block px-3 py-2 rounded-md text-base font-medium text-gray-400
                    hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white
                    focus:bg-gray-700">
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
