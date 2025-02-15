// composables/useCustomRouter.ts

export const useCustomRouter = () => {
  const router = useRouter();
  const localePath = useLocalePath();
  console.log('localePath',localePath)
  const route = useRoute();

  // Chuyển hướng với locale
  const push = (path: string) => {
    return router.push(localePath(path));
  };

  // Chuyển hướng tới trang trước đó
  const back = () => {
    router.back();
  };

  // Thay thế route hiện tại
  const replace = (path: string) => {
    return router.replace(localePath(path));
  };

  // Kiểm tra route hiện tại có match với path không
  const isActive = (path: string) => {
    return route.path.startsWith(path);
  };

  // Lấy current route name
  const currentRoute = computed(() => {
    return route.name;
  });

  // Lấy path hiện tại không bao gồm locale
  const currentPath = computed(() => {
    return route.path;
  });

  return {
    push,
    back,
    replace,
    isActive,
    currentRoute,
    currentPath,
    route,
  };
};
