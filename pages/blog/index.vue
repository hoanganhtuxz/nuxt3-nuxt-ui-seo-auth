<script setup lang="ts">
import type { Blog } from '~~/types/blog'
import BlogCard from "~~/components/blogs/BlogCard.vue"

const { data: blogs, error } = await useFetch<Blog[]>('/api/blogs')

// Add error logging
if (error.value) {
  console.error('Error fetching blogs:', error.value)
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
})
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Latest Articles</h1>
    
    <!-- Loading state -->
    <div v-if="!blogs" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>

    <!-- Content -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard 
        v-for="blog in blogs" 
        :key="blog.id" 
        :blog="blog" 
      />
    </div>
  </main>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>