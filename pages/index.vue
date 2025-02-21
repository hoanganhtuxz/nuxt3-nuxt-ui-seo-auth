<template>
  <div>
    <!-- Hero Section -->
    <section class="py-12 md:py-24">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="md:w-1/2 space-y-6">
            <UBadge color="primary" variant="soft" size="lg">Nuxt 3 + @nuxt/ui</UBadge>
            <h1 class="text-4xl md:text-6xl font-bold leading-tight">
              Xây dựng ứng dụng web hiện đại
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              Một khung làm việc mạnh mẽ kết hợp Nuxt 3 và @nuxt/ui giúp phát triển nhanh chóng với thiết kế đẹp mắt
            </p>
            <div class="flex flex-wrap gap-4">
              <UButton
                color="primary"
                size="xl"
                icon="i-heroicons-rocket-launch"
              >
                Bắt đầu
              </UButton>
              <UButton
                color="gray"
                variant="ghost" 
                size="xl"
                icon="i-heroicons-document-text"
              >
                Tài liệu
              </UButton>
            </div>
          </div>
          <div class="md:w-1/2">
            <UCard
              class="w-full h-96 bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-computer-desktop"
                class="w-32 h-32 text-white animate-pulse"
              />
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-100 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">Tính năng nổi bật</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Khám phá những tính năng mạnh mẽ giúp xây dựng ứng dụng nhanh chóng và hiệu quả
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UCard v-for="(feature, index) in features" :key="index">
            <template #header>
              <div class="flex items-center gap-4 p-4">
                <UIcon :name="feature.icon" class="text-primary-500 w-10 h-10" />
                <h3 class="text-xl font-semibold">{{ feature.title }}</h3>
              </div>
            </template>
            <div class="p-4">
              <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <UDivider class="my-8" />
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="text-center">
            <h3 class="text-4xl font-bold text-primary-600 dark:text-primary-400">{{ stat.value }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mt-2">{{ stat.label }}</p>
          </div>
        </div>
        <UDivider class="my-8" />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-500 dark:bg-primary-800">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">Sẵn sàng để bắt đầu?</h2>
        <p class="text-lg text-white opacity-90 max-w-2xl mx-auto mb-8">
          Tham gia cùng hàng nghìn nhà phát triển đang xây dựng ứng dụng hiện đại với Nuxt 3 và @nuxt/ui.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            color="white"
            size="xl"
          >
            Đăng ký miễn phí
          </UButton>
          <UButton
            color="white"
            variant="outline"
            size="xl"
          >
            Tìm hiểu thêm
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Trang chủ'
})

// Features data
const features = [
  {
    title: 'UI Components',
    icon: 'i-heroicons-cube',
    description: 'Hơn 40 components UI được xây dựng sẵn, tùy biến dễ dàng và tương thích hoàn toàn với Tailwind CSS.'
  },
  {
    title: 'Nuxt 3',
    icon: 'i-heroicons-server',
    description: 'Tận dụng sức mạnh của Nuxt 3 với khả năng render phía server, tạo trang tĩnh và API endpoints.'
  },
  {
    title: 'TypeScript',
    icon: 'i-heroicons-code-bracket',
    description: 'Hỗ trợ TypeScript đầy đủ, giúp phát triển an toàn hơn với hỗ trợ auto-completion.'
  },
  {
    title: 'Dark Mode',
    icon: 'i-heroicons-moon',
    description: 'Hỗ trợ sẵn chế độ tối/sáng, tự động phát hiện và nhớ tùy chọn của người dùng.'
  },
  {
    title: 'Icons',
    icon: 'i-heroicons-sparkles',
    description: 'Tích hợp hàng nghìn biểu tượng từ các bộ như Heroicons và Material Design Icons.'
  },
  {
    title: 'Responsive',
    icon: 'i-heroicons-device-phone-mobile',
    description: 'Thiết kế hoàn toàn responsive, phù hợp với mọi kích thước màn hình và thiết bị.'
  }
]

// Stats data
const stats = [
  {
    value: '10k+',
    label: 'Nhà phát triển'
  },
  {
    value: '1M+',
    label: 'Downloads'
  },
  {
    value: '50+',
    label: 'Components'
  },
  {
    value: '99%',
    label: 'Hài lòng'
  }
]
</script>