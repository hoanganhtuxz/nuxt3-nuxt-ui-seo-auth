export interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string; // Đường dẫn trực tiếp đến ảnh
  author: string; // Tên tác giả
  publishDate: string; // Ngày xuất bản dạng "YYYY-MM-DD"
  tags: string[]; // Mảng các tag dạng string
}
