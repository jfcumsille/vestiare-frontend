<template>
  <div class="flex flex-col">
    <slot name="top-section" />
    <div>
      <div class="inline-block min-w-full">
        <div class="shadow-md rounded-lg overflow-hidden">
          <table class="w-full">
            <slot name="head" />
            <tbody>
              <slot name="content" />
            </tbody>
          </table>
          <slot name="empty-table" />
        </div>
      </div>
    </div>
    <slot name="pagination" />
  </div>
</template>
