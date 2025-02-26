import type { MenuItem } from "~/types/Menu";

export const HeaderMenu: MenuItem[] = [
  {
    id: "dashboard",
    label: "Trang chủ",
    to: "/",
    icon: "i-heroicons-home",
    auth: false,

  },
  {
    id: "products",
    label: "Sản phẩm",
    to: "/product",
    icon: "i-heroicons-users",
    auth: true,
  },
  // {
  //   id: "products",
  //   label: "Sản phẩm",
  //   icon: "i-heroicons-chevron-down-20-solid",
  //   children: [
  //     {
  //       id: "product-list",
  //       label: "Danh sách sản phẩm",
  //       to: "/products",
  //     },
  //     {
  //       id: "product-categories",
  //       label: "Danh mục sản phẩm",
  //       to: "/products/categories",
  //     },
  //     {
  //       id: "product-inventory",
  //       label: "Quản lý tồn kho",
  //       to: "/products/inventory",
  //     },
  //   ],
  // },
  {
    id: "blogs",
    label: "Bài viết",
    to: "/blog",
    icon: "i-heroicons-users",
    auth: false,

  },
];
