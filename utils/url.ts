export const useUrlUtils = () => {
    const config = useRuntimeConfig();
    const route = useRoute();
    const { locale } = useI18n();
  
    const getFullUrl = (): string => {
      const baseUrl = config.public?.siteUrl || 'http://localhost:3000';
      const path = route.path;
      const currentLang = locale.value;
  
      if (!path.startsWith(`/${currentLang}`)) {
        return `${baseUrl}/${currentLang}${path}`;
      }
      return `${baseUrl}${path}`;
    };
  
    return {
      getFullUrl
    };
  };