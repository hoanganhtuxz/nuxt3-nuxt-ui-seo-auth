<script setup lang="ts">
import type { Blog } from '~~/types/blog'

interface Props {
  blog: Blog
}
defineProps<Props>()

</script>

<template>
  <article class="prose max-w-none">
    <div class="mb-8">
      <img 
        :src="blog.image" 
        :alt="blog.title" 
        class="w-full h-64 object-cover rounded-lg"
      />
    </div>

    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-4">{{ blog.title }}</h1>
      <div class="flex items-center text-gray-600 gap-4">
        <div class="flex items-center">
          <span class="font-medium">{{ blog.author }}</span>
        </div>
        <div class="text-gray-400">•</div>
        <time :datetime="blog.publishDate">
          {{ new Date(blog.publishDate).toLocaleDateString() }}
        </time>
      </div>
    </header>

    <div class="mb-6">
      <p class="text-xl text-gray-600">{{ blog.description }}</p>
    </div>

    <div class="content">
      {{ blog.content }}
    </div>

    <footer class="mt-8 pt-8 border-t">
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tag in blog.tags" 
          :key="tag"
          class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
        >
          {{ tag }}
        </span>
      </div>
    </footer>
  </article>
</template>