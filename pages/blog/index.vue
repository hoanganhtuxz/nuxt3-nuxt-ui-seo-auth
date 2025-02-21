<script setup lang="ts">
import type { Blog } from "~~/types/blog";

const { data: blogs, error } = await useFetch<Blog[]>("/api/blogs", {
  key: "blogs-list",
  // Tối ưu cho SSR
  server: true,
});

// Add error logging
if (error.value) {
  console.error("Error fetching blogs:", error.value);
}
useHead({
  title: "Blog - Latest Articles",
  meta: [
    {
      name: "description",
      content: "Read our latest articles about web development and technology",
    },
    {
      property: "og:title",
      content: "Blog - Latest Articles",
    },
    {
      property: "og:type",
      content: "blog",
    },
  ],
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Blogs page</h1>

    <!-- Loading state -->
    <div v-if="!blogs" class="flex justify-center py-8">
      <p>Đang tải...</p>
    </div>

    <!-- Content -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogsCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
    </div>
  </div>
</template>

<style scoped></style>
