import { defineEventHandler, getRouterParam } from "h3";
import type { Blog } from "~~/types/blog";

export default defineEventHandler(async (event): Promise<Blog> => {
  const id = getRouterParam(event, 'id')
  return {
    id: Number(id),
    title: "Getting Started with Nuxt 3",
    description: "Learn how to build modern web applications with Nuxt 3",
    content: "Full content here...",
    image: "/blog/nuxt3.jpg",
    author: "John Doe",
    publishDate: "2024-02-14",
    tags: ["Nuxt", "Vue", "JavaScript"],
  };
});
