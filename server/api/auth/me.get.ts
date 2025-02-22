import { defineEventHandler } from "h3";
import { fetchConfig } from "~/server/utils/configApi";

export default defineEventHandler((event) => {
  try {
    const data = fetchConfig.get(
      "https://api.mindmaid.ai/api/get-info-user",
      event,
      { auth: true }
    );
    if (!data) {
      throw createError({
        statusCode: 404,
        message: "Không tìm thấy thông tin người dùng",
      });
    }
    return data;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: "Không thể lấy danh sách blog",
    });
  }
});
