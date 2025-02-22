<template>
  <div class="space-y-6">
    <div
      v-for="i in count"
      :key="i"
      class="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
    >
      <!-- Thumbnail skeleton -->
      <div
        class="w-full md:w-72 h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"
      ></div>

      <!-- Content skeleton -->
      <div class="p-5 flex-1">
        <!-- Title -->
        <div
          class="h-6 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"
        ></div>

        <!-- Meta info -->
        <div
          class="h-4 w-2/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-5"
        ></div>

        <!-- Excerpt lines -->
        <div class="space-y-2">
          <div
            class="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          ></div>
          <div
            class="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          ></div>
          <div
            class="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count?: number;
}

withDefaults(defineProps<Props>(), {
  count: 3,
});
</script>
