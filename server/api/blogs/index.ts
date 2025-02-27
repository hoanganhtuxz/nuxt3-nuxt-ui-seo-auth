import { defineEventHandler, getQuery } from "h3";
import { fetchConfig } from "~/server/utils/configApi";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  try {
    const data = fetchConfig.get("/blogs", event, query);
    if (!data) {
      throw createError({
        statusCode: 404,
        message: "Không tìm thấy danh sách blog",
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
