import { createI18n } from "vue-i18n";
import vi from "~/i18n/locales/vi.json";
import en from "~/i18n/locales/en.json";

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();
  //// Lấy locale từ URL
  const urlLocale = route.path.split("/")[1] as "en" | "vi";
  const validLocales = ["en", "vi"] as const;

  // Kiểm tra và set locale từ URL nếu hợp lệ
  const initialLocale = validLocales.includes(urlLocale)
    ? (urlLocale as "en" | "vi")
    : "vi";

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: initialLocale,
    fallbackLocale: "vi",
    messages: {
      vi,
      en,
    },
  });

  nuxtApp.vueApp.use(i18n);
});
