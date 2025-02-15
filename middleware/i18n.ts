export default defineNuxtRouteMiddleware((to, from) => {
  const { locale, locales } = useI18n();
  const i18nCookie = useCookie('i18n_redirected');
  
  // Lấy segment đầu tiên của URL
  const firstSegment = to.path.split('/')[1];
  
  // Kiểm tra xem segment có phải là locale hợp lệ không
  const isValidLocale = locales.value.some(loc => loc.code === firstSegment);
  
  // Nếu không có locale trong URL
  if (!isValidLocale) {
    // Ưu tiên sử dụng locale từ cookie nếu có
    const targetLocale = i18nCookie.value || 'vi';
    
    // Tạo URL mới với locale
    const redirectPath = `/${targetLocale}${to.path}`;
    const redirectQuery = to.query;
    
    // Chuyển hướng với giữ nguyên query parameters
    return navigateTo({
      path: redirectPath,
      query: redirectQuery
    }, { 
      redirectCode: 301,
      replace: true 
    });
  }
  
  // Nếu locale trong URL khác với cookie, cập nhật cookie
  if (isValidLocale && i18nCookie.value !== firstSegment) {
    i18nCookie.value = firstSegment;
  }
});