import type { LoginReq, LoginRes, User } from "~/types/auth";

export function useAuth() {
  const user = useState<User | null>("user", () => null);
  const accessToken = useCookie<string | null>("accessToken", {
    default: () => null,
  });

  // 🔹 Đăng nhập
  // const login = async (payload: LoginReq) => {
  //   const { data, error } = await useFetch<LoginRes>("/api/auth/login", {
  //     method: "POST",
  //     body: payload,
  //   });

  //   if (error.value) throw error.value;

  //   if (data.value) {
  //     accessToken.value = data.value.access_token; // Lưu token vào cookie
  //     // await getUserInfo(); // Fetch user ngay sau khi đăng nhập
  //   }

  //   return data.value;
  // };

   const login = async (payload: LoginReq) => {
    try {
      const response = await $fetch<LoginRes>("/api/auth/login", {
        method: "POST",
        body: payload,
      });

      if (response) {
        accessToken.value = response.access_token;
        await getUserInfo();
      }

      return response;
    } catch (error) {
      throw error;
    }
  };
  // 🔹 Lấy thông tin người dùng
  const getUserInfo = async () => {
    if (!accessToken.value || user.value) return null;

    const response = await $fetch<User>("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });



    if (response) {
      user.value = response
    }

    return user.value;
  };

  // 🔹 Đăng xuất
  const logout = () => {
    user.value = null;
    accessToken.value = null;
    navigateTo("/");
  };
  return {
    isAuthenticated: computed(() => !!user.value),
    user,
    getUserInfo,
    login,
    logout,
  };
}
