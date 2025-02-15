<script setup lang="ts">
import type { Blog } from "~~/types/blog";

interface Props {
  blog: Blog;
}

withDefaults(defineProps<Props>(), {
  blog: () => ({
    id: 0,
    title: "",
    description: "",
    content: "",
    image: "",
    author: "",
    publishDate: "",
    tags: [],
  }),
});
</script>

<template>
  <article class="border rounded-lg p-4">
    <NuxtLink :to="`/blog/${blog.id}`">
      <img
        :src="blog.image"
        :alt="blog.title"
        class="w-full h-48 object-cover rounded"
      />
      <h2 class="text-xl font-bold mt-2">{{ blog.title }}</h2>
      <p class="text-gray-600">{{ blog.description }}</p>
      <div class="mt-2 text-sm text-gray-500">
        {{ new Date(blog.publishDate).toLocaleDateString() }}
      </div>
    </NuxtLink>
  </article>
</template>
