<template>
  <UForm
    :state="formData"
    :schema="schema"
    @submit="handleSubmit"
    class="space-y-4"
  >
    <UFormGroup name="email" :label="$t('signin.email')">
      <UInput
        v-model="formData.email"
        type="email"
        :placeholder="$t('signin.emailPlaceholder')"
        icon="i-ph-envelope"
        required
      />
    </UFormGroup>

    <UFormGroup name="password" :label="$t('signin.password')">
      <UInput
        v-model="formData.password"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="$t('signin.passwordPlaceholder')"
        icon="i-ph-lock"
        required
      >
        <template #trailing>
          <UButton color="gray" variant="ghost" @click="togglePassword">
            <UIcon
              :name="showPassword ? 'i-ph-eye-slash' : 'i-ph-eye'"
              class="h-4 w-4"
            />
          </UButton>
        </template>
      </UInput>
    </UFormGroup>

    <div class="flex items-center justify-between">
      <UCheckbox
        v-model="formData.rememberMe"
        :label="$t('signin.rememberMe')"
      />
      <NuxtLink
        class="text-sm font-medium text-primary-600 hover:text-primary-500"
      >
        {{ $t("signin.forgotPassword") }}
      </NuxtLink>
    </div>

    <UButton type="submit" block :loading="isLoading">
      {{ $t("signin.submit") }}
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { useI18n } from "#i18n";
import { object, string } from "yup";

interface FormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const formData = ref<FormData>({
  email: "",
  password: "",
  rememberMe: false,
});

const showPassword = ref(false);
const isLoading = ref(false);
const { t } = useI18n();
const localePath = useLocalePath();
const toast = useToast();
const route = useRoute();
const redirectPath = route.query.redirect as string;

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const schema = object({
  email: string()
    .email(t("signin.errors.invalidEmail"))
    .required(t("signin.errors.invalidEmail")),
  password: string()
    .min(6, t("signin.errors.passwordTooShort"))
    .required(t("signin.errors.passwordRequired")),
});

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    await useAuth().login({
      email: formData.value.email,
      password: formData.value.password,
    });
    
    await navigateTo(localePath(redirectPath || '/'));
  } catch (error: any) {
    toast.add({
      title: error.message,
      description: error.message,
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
