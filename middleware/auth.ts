import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();
  
  if (!auth.user.value) {
    await auth.getUserInfo(); // Chỉ gọi API nếu chưa có user
  }
  // Lấy lang từ URL (ví dụ: "/vi/admin" → "vi")
  const lang = to.path.split("/")[1]; // Giả sử lang luôn ở vị trí đầu tiên

  // Xử lý trường hợp guestOnly (trang đăng nhập/đăng ký)
  const guestOnly =
    (to.meta.auth as { guestOnly?: boolean })?.guestOnly || false;

  // Nếu người dùng đã đăng nhập và đang cố truy cập trang chỉ dành cho khách
  if (guestOnly && auth.isAuthenticated.value) {
    return navigateTo(`/${lang || "vi"}`); // Chuyển về trang chủ với ngôn ngữ hiện tại
  }

  // Xử lý trường hợp người dùng chưa đăng nhập
  if (!auth.isAuthenticated.value) {
    // Nếu trang yêu cầu đăng nhập, chuyển đến trang login với redirect URL
    if (!guestOnly) {
      // Mã hóa đường dẫn hiện tại để dùng làm redirect sau khi đăng nhập
      return navigateTo({
        path: `/${lang}/auth/login`,
        query: { redirect: to.fullPath },
      });
    }
  } else {
    // Người dùng đã đăng nhập, kiểm tra quyền
    const requiredRoles = (to.meta.roles as string[]) || [];

    if (
      requiredRoles.length > 0 &&
      !requiredRoles.includes(auth.user.value?.role ?? "")
    ) {
      return navigateTo(`/${lang || "vi"}`); // Chuyển về trang chủ nếu không có quyền
    }
  }
});
