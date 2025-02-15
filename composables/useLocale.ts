export const useLocale = () => {
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();
  const route = useRoute();
  const router = useRouter();
  const i18nCookie = useCookie("i18n_redirected");

  const availableLocales = computed(() => {
    return locales.value.map((i) => ({
      code: i.code,
      name: i.name,
    }));
  });

  const currentLocale = computed({
    get: () => locale.value,
    set: async (newLocale) => {
      // Cập nhật cookie
      i18nCookie.value = newLocale;

      // Cập nhật locale
      locale.value = newLocale;

      // Lấy đường dẫn mới cho locale đã chọn
      const newPath = switchLocalePath(newLocale);

      if (newPath) {
        await router.push(newPath);
      }
    },
  });

  return {
    currentLocale,
    availableLocales,
  };
};
