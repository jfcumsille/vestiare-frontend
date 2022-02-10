<template>
  <div>
    <div id="nav">
      <div class="nav-left">
        <FintocLogo/>
        <router-link class="router-link hover:text-main ml-8" to="/links">Links</router-link>
        <router-link class="router-link hover:text-main ml-8" to="/api-keys">API Keys</router-link>
        <router-link class="router-link hover:text-main ml-8" to="/webhooks">Webhooks</router-link>
      </div>
      <div class="nav-right flex flex-row">
        <a href="https://blog.fintoc.com" target="blank" class="router-link hover:text-main"> Blog</a>
        <a href="https://docs.fintoc.com/" target="blank" class="router-link hover:text-main ml-8"> Documentación </a>
        <!-- Profile dropdown -->
            <div class="ml-8 z-30 relative">
              <div>
                <button class="rounded-md router-link hover:text-main
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
                <div v-show='showDropDown' class="w-40 origin-top-right
                absolute right-0 mt-2 rounded-md shadow-lg">
                  <router-link to="/user-profile" class="px-3 py-2
                  rounded-b-md bg-white block router-link
                  hover:text-main w-full text-left no-underline"> Mi perfil </router-link>
                  <div class="bg-gray-200 h-px"/>
                  <button class="px-3 py-2 rounded-b-md bg-white
                  block router-link hover:text-main
                  w-full text-left font-medium" role="menuitem" @click='signOut'> Salir </button>
                </div>
              </transition>
            </div>
      </div>
    </div>
    <div class="bg-gray-300 h-px mx-10 nav-line"/>
  </div>
</template>

<script>
import FintocLogo from './FintocLogo.vue';

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
  components: {
    FintocLogo,
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

#nav {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 24px 30px;
  color: #0e0946;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1300px;
  width: 100%;
}

.nav-line {
  margin-left: auto;
  margin-right: auto;
  max-width: 1300px;
}

.router-link{
  font-weight: 500;
  color: #0e0946;
  text-decoration: none;
}

.router-link.router-link-exact-active {
  color: #3753ff;
}

html {
  background-color: #1d1d1d;
}

.router-links {
  display: flex;
  justify-content: space-between;
  margin: 0px 20px;
  padding: 20px;
  width: 120px;
}

.nav-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-right {
  display: flex;
  flex-direction: row;
  align-items: right;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.menu-item .sub-menu {
  position: absolute;
  top: calc(100%);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  z-index: 3;
}

.menu-item {
  position: relative;
  display: flex;
  color: #1d1d1d;
  background: #fff;
  padding: 10px 12px;
  transition: 0.4s;
  border: 1px solid #323232;
  min-width: 75px;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 12px;
}

.menu-item:hover {
  background-color: #fff;
  color: #1d1d1d;
}
.menu-item button {
  color: #1d1d1d;
  text-decoration: none;
  font-size: 16px;
  font-weight: 300;
}
.menu-item:hover button {
  color: #1d1d1d;
}

.dropdown-text {
  font-size: 16px;
  margin-right: 6px;
}

</style>
