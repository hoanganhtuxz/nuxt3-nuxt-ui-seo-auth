<script setup lang="ts">
import BlogContent from "~~/components/blogs/BlogContent.vue";
import type { Blog } from "~~/types/blog";

const route = useRoute()
const { data: blog } = await useFetch<Blog>(`/api/blogs/${route.params.id}`)

// SEO configuration
useHead(() => ({
  title: blog.value?.title,
  meta: [
    {
      name: "description",
      content: blog.value?.description,
    },
    // Open Graph
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:title",
      content: blog.value?.title,
    },
    {
      property: "og:description",
      content: blog.value?.description,
    },
    {
      property: "og:image",
      content: blog.value?.image,
    },
    {
      property: "article:published_time",
      content: blog.value?.publishDate,
    },
  ],
  // Schema.org markup
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.value?.title,
        description: blog.value?.description,
        image: blog.value?.image,
        datePublished: blog.value?.publishDate,
        author: {
          "@type": "Person",
          name: blog.value?.author,
        },
      }),
    },
  ],
}));
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">
    <BlogContent v-if="blog" :blog="blog" />
  </main>
</template>
