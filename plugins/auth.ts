export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuth();

  // Kiểm tra thông tin người dùng khi ứng dụng khởi động
  if (process.client) {
    if (!auth.user.value) {
      await auth.getUserInfo();
    }
  }

  return {
    provide: {
      auth,
    },
  };
});
