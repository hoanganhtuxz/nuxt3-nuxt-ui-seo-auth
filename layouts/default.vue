<!-- layouts/default.vue -->
<template>
  <div>
    <header class="bg-white shadow-sm">
      <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="text-xl font-bold text-green-600">
          Your Logo
        </NuxtLink>

        <!-- Navigation buttons -->
        <div class="flex items-center gap-4">
          <!-- Blog button -->
          <NuxtLink 
            :to="localePath('/blog')" 
            class="px-4 py-2 rounded-md transition-colors"
            :class="{
              'bg-green-600 text-white': customRouter.isActive('/blog'), 
              'text-gray-600 hover:bg-gray-100': !customRouter.isActive('/blog')
            }"
          >
            Blog
          </NuxtLink>

          <!-- Sign in button -->
          <button 
            @click="navigateToSignIn" 
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Đăng nhập
          </button>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const customRouter = useCustomRouter();

const navigateToSignIn = () => {
  customRouter.push('/signin');
};
</script>