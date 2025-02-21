<template>
  <ClientOnly class="auth-container">
    <!-- Login button -->
    <template v-if="!isAuthenticated">
      <UButton size="sm" color="primary" @click="handleLogin">
        <UIcon name="i-heroicons-user" class="mr-1" />
        Đăng nhập
      </UButton>
    </template>

    <!-- Thông tin tài khoản -->
    <template v-else>
      <div class="flex items-center gap-4">
        <p>{{ user?.email }}</p>
        <UButton size="sm" color="red" @click="handleLogout">
          <UIcon name="i-heroicons-user" class="mr-1" /> Đăng xuất
        </UButton>
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
const router = useCustomRouter();

const user = computed(() => {
  return useAuth().user.value;
})

const isAuthenticated = computed(() => {
  return useAuth().isAuthenticated.value;
});

const handleLogin = () => {
  router.push("/auth/login");
};

const handleLogout = () => {
  useAuth().logout();
};
</script>
