<template>
  <UCard :class="{ 'flex-row': horizontal }" class="overflow-hidden">
    <!-- Image skeleton -->
    <div
      v-if="hasImage"
      :class="[
        horizontal ? 'w-48 md:w-64' : 'w-full h-48',
        'bg-gray-200 dark:bg-gray-700 animate-pulse',
      ]"
    ></div>

    <!-- Content skeleton -->
    <div class="p-4 flex-1">
      <div
        class="h-6 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"
      ></div>

      <div class="space-y-2 mb-6">
        <div
          v-for="i in lines"
          :key="i"
          class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          :class="i === lines ? 'w-2/3' : 'w-full'"
        ></div>
      </div>

      <div v-if="hasFooter" class="flex justify-between items-center">
        <div
          class="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
        ></div>
        <div
          class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
        ></div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  hasImage?: boolean;
  hasFooter?: boolean;
  lines?: number;
  horizontal?: boolean;
}
withDefaults(defineProps<Props>(), {
  hasImage: true,
  hasFooter: true,
  lines: 3,
  horizontal: false,
});
</script>
