import { defineEventHandler } from "h3";
import { fetchConfig } from "~/server/utils/configApi";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "ID blog là bắt buộc",
    });
  }

  try {
    const blog = await fetchConfig.get(`/blogs/${id}`, event);
    if (!blog) {
      throw createError({
        statusCode: 404,
        message: "Không tìm thấy blog",
      });
    }
    return blog;
  } catch (error: any) {
    console.error(`Failed to fetch blog ${id}:`, error);
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message || "Không thể lấy thông tin blog",
    });
  }
});
