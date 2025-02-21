<script setup lang="ts">
import { ContentType } from "~/types/seo";
import type { Blog } from "~~/types/blog";

// definePageMeta({
//   middleware: ['auth'],
//   auth: { required: true, checkId: true }
// })
const config = useRuntimeConfig();
const origin = config.public.siteUrl;
const route = useRoute();

const { data: blog, error } = await useFetch<Blog>(
  `/api/blogs/${route.params.id}`
);

if (error.value) {
  console.error("Error fetching blog:", error.value);
}

const blogData = blog.value as Blog;

useSeo({
  title: blogData.title || "Blog Article",
  description:
    blogData.description ||
    blogData.content?.replace(/<[^>]*>/g, "").substring(0, 157) + "...",
  image: blogData.image
    ? {
        url: blogData.image.startsWith("http")
          ? blogData.image
          : `${origin}/${blogData.image}`,
        alt: blogData.title,
      }
    : undefined,
  type: ContentType.Article,
  publishedTime:
    blogData.publishDate && new Date(blogData.publishDate).toISOString(),
  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
    { name: blogData.title || "Blog Detail", url: route.fullPath },
  ],
  canonicalUrl: `${origin}${route.fullPath}`,
});
</script>

<template>
  <div v-if="!blog" class="flex justify-center py-8">
    <p>Đanh tải...</p>
  </div>
  <div v-else class="max-w-4xl mx-auto px-4 py-8">
    <BlogsContent v-if="blog" :blog="blog" />
  </div>
</template>
