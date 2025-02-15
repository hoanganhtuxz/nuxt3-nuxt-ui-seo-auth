<template>
  <div>
    <template v-if="$i18n.locale">
      <h1 class="text-red-500">{{ $t("welcome") }}</h1>
      <p>{{ t("nav.home") }}</p>

      <select :value="$i18n.locale" @change="onLanguageChange">
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </template>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useCookie } from "nuxt/app";
import { onMounted } from 'vue';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();

onMounted(() => {
//   const i18nCookie = useCookie("i18n_redirected");
//   if (i18nCookie.value) {
//     locale.value = i18nCookie.value;
//     // Cập nhật URL nếu cần
//     const currentPath = route.fullPath;
//     const newPath = currentPath.replace(`/${locale.value}`, `/${i18nCookie.value}`);
//     router.push(newPath);
//   }
});

const onLanguageChange = async (event) => {
  const newLocale = event.target.value;
  
  // Cập nhật cookie
  const i18nCookie = useCookie("i18n_redirected");
  i18nCookie.value = newLocale;

  // Lấy đường dẫn hiện tại và tạo đường dẫn mới
  const currentPath = route.fullPath;
  const newPath = currentPath.replace(`/${locale.value}`, `/${newLocale}`);

  // Cập nhật locale
  locale.value = newLocale;

  // Chuyển hướng đến đường dẫn mới
  await router.push(newPath);
};
</script>