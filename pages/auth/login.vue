<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center">
    <div class="sm:mx-auto sm:w-full sm:max-w-md px-4">
      <div class="text-center mb-8">
        <NuxtLink :to="'/'" class="inline-block">
          <img
            src="~/assets/images/logo.svg"
            alt="Logo"
            class="mx-auto h-12 w-auto"
          />
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          {{ $t("signin.title") }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ $t("signin.description") }}
        </p>
      </div>

      <div class="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10">
        <SigninForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "custom",
  middleware: ["auth"],
  auth: { guestOnly: true },
});

const { t } = useI18n();

// SEO
useSeo({
  title: t("signin.metaTitle"),
  description: t("signin.metaDescription"),
  noindex: true,
});
</script>

<style scoped>
/* Styles remain unchanged */
</style>
