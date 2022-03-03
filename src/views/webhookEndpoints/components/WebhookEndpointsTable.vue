<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md sm:rounded-lg">
          <table class="min-w-full">
            <slot name="header" />
            <tbody>
              <slot name="content" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
