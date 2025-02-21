import { fetchConfig } from "~/server/utils/configApi";
import type { LoginReq, LoginRes, User } from "~/types/auth";

export default defineEventHandler(async (event): Promise<User | any> => {
  try {
    const body = await readBody<LoginReq>(event);

    // Đảm bảo thêm await để đợi kết quả từ API call
    const response = await fetchConfig.post<LoginRes>(
      `https://api.mindmaid.ai/api/auth/login/`,
      event,
      body
    );
    if (response.access_token) {
      // Lưu access token vào cookie (với httpOnly = false) để client có thể truy cập
      setCookie(event, "accessToken", response.access_token, {
        httpOnly: false, // Client cần truy cập để thêm vào header
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1 * 24 * 60 * 60, // 1 ngày
        path: "/",
      });

      // Ẩn refresh token trước khi trả về
      const {refresh_token, ...user } = response;
      return user;
    }
  } catch (error: any) {
    console.error("Login error:", error);

    const apiError: any = {
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    };

    if (error.data?.errors) {
      apiError.errors = error.data.errors;
    }

    throw createError(apiError);
  }
});
