<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 md:p-8 max-w-4xl mx-auto"
  >
    <!-- Header -->
    <div class="mb-8">
      <!-- Title -->
      <div
        class="h-8 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"
      ></div>

      <!-- Meta info -->
      <div class="flex space-x-5 mb-3">
        <div
          class="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
        ></div>
        <div
          class="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Cover image -->
    <div
      class="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-8"
    ></div>

    <!-- Content -->
    <div class="space-y-6 mb-8">
      <div v-for="i in 6" :key="i" class="space-y-2">
        <div
          v-for="j in getRandomLines()"
          :key="j"
          class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          :class="j === getRandomLines() ? 'w-4/5' : 'w-full'"
        ></div>
      </div>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-3 mb-8">
      <div
        v-for="i in 3"
        :key="i"
        class="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
      ></div>
    </div>

    <!-- Comments section -->
    <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
      <!-- Comments title -->
      <div
        class="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"
      ></div>

      <!-- Comments -->
      <div
        v-for="i in 2"
        :key="i"
        class="flex gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0"
      >
        <!-- Avatar -->
        <div
          class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0"
        ></div>

        <!-- Comment content -->
        <div class="flex-1">
          <div
            class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"
          ></div>
          <div class="space-y-2">
            <div
              class="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            ></div>
            <div
              class="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function getRandomLines() {
  return Math.floor(Math.random() * 3) + 3; // Random number between 3-5
}
</script>
