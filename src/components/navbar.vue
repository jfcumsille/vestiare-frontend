<template>
   <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-12" src="../assets/images/fintoc-logo-white.png" alt="Fintoc" />
          </div>
          <div>
            <div class="ml-10 flex items-baseline">
              <router-link to="/links" active-class="bg-gray-900"
                           class="px-3 py-2 rounded-md text-sm font-medium text-gray-300
                                  hover:text-white hover:bg-gray-700 focus:outline-none">
                Links
              </router-link>
              <router-link to="/api-keys" active-class="bg-gray-900"
                           class="ml-4
                                  px-3 py-2 rounded-md text-sm font-medium text-gray-300
                                  hover:text-white hover:bg-gray-700 focus:outline-none">
                Api keys
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
