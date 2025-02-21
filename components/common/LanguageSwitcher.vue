<template>
  <UPopover mode="hover" :popper="{ offsetDistance: 0 }">
    <UButton
      color="white"
      variant="soft"
      class="flex items-center space-x-1 px-3 py-2  hover:!shadow-md transition-all !border-none"
    >
      <UIcon
        :name="currentLocale === Language.EN ? 'emojione-flag-for-united-kingdom' : 'emojione-flag-for-vietnam'"
        class="w-5 h-5"
      />
      <span class="text-gray-700">{{ currentLocale.toUpperCase() }}</span>
      <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-gray-500" />
    </UButton>

    <template #panel="{ close }">
        <div class="py-2 !p-0 w-40">
          <UButton
            v-for="locale in availableLocales"
            :key="locale.code"
            variant="ghost"
            color="gray"
            class="w-full justify-start px-4 py-2 hover:bg-green-100 transition-all rounded-none !border-none"
            @click="() => {
              handleLocaleChange(locale.code);
              close();
            }"
          >
            <UIcon
              :name="locale.code ===  Language.EN  ? 'emojione-flag-for-united-kingdom' : 'emojione-flag-for-vietnam'"
              class="w-5 h-5 mr-2"
            />
            <span>{{ locale.name }}</span>
          </UButton>
        </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { useLocale } from "~/composables/useLocale";
import { Language } from "~/types/language";

const { currentLocale, availableLocales } = useLocale();

const handleLocaleChange = (code: string) => {
  currentLocale.value = code as Language;
};
</script>