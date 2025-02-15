import { defineEventHandler } from 'h3'
import type { Blog } from '~~/types/blog'

export default defineEventHandler(() => {
  // Mock data
  const blogs: Blog[] = [
    {
      id: 1,
      title: "Getting Started with Nuxt 3",
      description: "Learn how to build modern web applications with Nuxt 3",
      content: "Full content here...",
      image: "/blog/nuxt3.jpg",
      author: "John Doe",
      publishDate: "2024-02-14",
      tags: ["Nuxt", "Vue", "JavaScript"]
    },
    {
      id: 2,
      title: "Understanding SEO in Nuxt",
      description: "Master SEO optimization in your Nuxt applications",
      content: "Full content here...",
      image: "/blog/seo.jpg",
      author: "Jane Smith",
      publishDate: "2024-02-15",
      tags: ["SEO", "Nuxt", "Web"]
    }
  ]
  return blogs
})