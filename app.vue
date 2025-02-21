<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
    <NuxtLoadingIndicator color="primary" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Toast Notifications -->
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
// Thiết lập dark/light mode
const colorMode = useColorMode();
</script>
