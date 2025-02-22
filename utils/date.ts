import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime); // Kích hoạt plugin hỗ trợ `fromNow()`

export const formatDate = (date: string | Date, format = "HH:mm - DD/MM/YYYY") => {
  return dayjs(date).format(format);
};

export const timeAgo = (date: string | Date) => {
  return dayjs(date).fromNow();
};
