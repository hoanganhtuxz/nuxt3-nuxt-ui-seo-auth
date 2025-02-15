<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  image?: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'My Nuxt App',
  description: 'My amazing Nuxt application',
  image: '/default-og-image.jpg',
  url: 'http://localhost:3000'
})

useHead({
  title: props.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: props.description
    },
    // Open Graph
    {
      hid: 'og:title',
      property: 'og:title',
      content: props.title
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: props.description
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: props.image
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: props.url
    }
  ]
})
</script>

<template>
  <div /> <!-- Empty div as we only need the script -->
</template>