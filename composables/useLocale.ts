import { useI18n } from '#i18n'

export const useLocale = () => {
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath();
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
      i18nCookie.value = newLocale;
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