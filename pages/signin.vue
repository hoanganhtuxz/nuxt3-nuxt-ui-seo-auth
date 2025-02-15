<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center mb-6">Đăng nhập</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Email field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          :class="{ 'border-red-500': errors.email }"
          placeholder="example@email.com"
        />
        <span v-if="errors.email" class="text-sm text-red-500">{{
          errors.email
        }}</span>
      </div>

      <!-- Password field -->
      <div>
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Mật khẩu
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            :class="{ 'border-red-500': errors.password }"
            placeholder="Nhập mật khẩu"
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <Icon v-if="showPassword" name="ph:eye-slash" class="w-5 h-5" />
            <Icon v-else name="ph:eye" class="w-5 h-5" />
          </button>
        </div>
        <span v-if="errors.password" class="text-sm text-red-500">{{
          errors.password
        }}</span>
      </div>

      <!-- Forgot password link -->
      <div class="text-right">
        <NuxtLink
          class="text-sm text-green-600 hover:text-green-500"
        >
          Quên mật khẩu?
        </NuxtLink>
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        class="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        :disabled="isLoading"
      >
        <span v-if="isLoading">Đang xử lý...</span>
        <span v-else>Đăng nhập</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

// Form data
const formData = ref({
  email: "",
  password: "",
});

// UI states
const showPassword = ref(false);
const isLoading = ref(false);
const errors = ref({
  email: "",
  password: "",
});

const localePath = useLocalePath();

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Validate email
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Handle form submission
const handleSubmit = async () => {
  // Reset errors
  errors.value = {
    email: "",
    password: "",
  };

  // Validate email
  if (!validateEmail(formData.value.email)) {
    errors.value.email = "Email không hợp lệ";
    return;
  }

  // Validate password
  if (formData.value.password.length < 6) {
    errors.value.password = "Mật khẩu phải có ít nhất 6 ký tự";
    return;
  }

  try {
    isLoading.value = true;

    // Save to localStorage
    localStorage.setItem(
      "userCredentials",
      JSON.stringify({
        email: formData.value.email,
        timestamp: new Date().toISOString(),
      })
    );

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Success message or redirect
    // You can add your own logic here
  } catch (error) {
    console.error("Login error:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
