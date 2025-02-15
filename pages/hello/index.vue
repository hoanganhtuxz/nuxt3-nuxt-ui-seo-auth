<script setup lang="ts">
const { data: hello } = await useFetch("/api/hello");
</script>

<template>
  <pre>{{ hello }}</pre>
</template>
