<template>
  <nav class="menu-container">
    <template v-for="(item, index) in menuItems">
      <!-- Mục menu không có submenu -->
      <div
        :key="`menu-${index}`"
        v-if="!hasChildren(item)"
        class="menu-item"
        :class="{ 'menu-item-active': isActive(item) }"
        @click="handleClick(item)"
      >
        <slot name="menu-item" :item="item">
          {{ item.label }}
        </slot>
      </div>

      <!-- Mục menu có submenu -->
      <UPopover
        v-else
        :key="`menu-popover-${index}`"
        :mode="mode"
        :open-delay="100"
        :close-delay="200"
        class="menu-popover"
        :popper="{ placement: 'bottom-start' }"
      >
        <div
          class="menu-item menu-item-with-children"
          :class="{ 'menu-item-active': isActive(item) }"
        >
          <slot name="menu-item" :item="item">
            {{ item.label }}
          </slot>
          <UIcon
            :name="item.icon || 'i-heroicons-chevron-down-20-solid'"
            class="menu-icon"
          />
        </div>

        <template #panel>
          <div class="submenu-panel">
            <template v-for="(child, childIndex) in item.children">
              <!-- Submenu level 2 không có children -->
              <div
                v-if="!hasChildren(child)"
                :key="`submenu-${index}-${childIndex}`"
                class="submenu-item"
                :class="{ 'submenu-item-active': isActive(child) }"
                @click="handleClick(child)"
              >
                <slot name="submenu-item" :item="child">
                  {{ child.label }}
                </slot>
              </div>
            </template>
          </div>
        </template>
      </UPopover>
    </template>

    <!-- Extra items slot -->
    <slot name="extra-nav-items"></slot>
  </nav>
</template>

<script lang="ts" setup>
import type { MenuItem } from "~/types/Menu";

// Đơn giản hóa props
interface MenuProps {
  modelValue?: string | null;
  menuItems: MenuItem[];
  exactMatch?: boolean;
  mode?: "hover" | "click";
}

const props = withDefaults(defineProps<MenuProps>(), {
  modelValue: null,
  menuItems: () => [],
  exactMatch: false,
  mode: "hover", // Đặt mặc định là hover để menu hoạt động tốt hơn
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
  (e: "item-click", item: MenuItem): void;
}>();

// State variables
const activeItemId = computed({
  get: () => props.modelValue,
  set: (value: string | null) => emit("update:modelValue", value),
});

const route = useRoute();
const router = useCustomRouter();

// Kiểm tra nhanh nếu item có children
const hasChildren = (item: MenuItem): boolean => {
  return !!(item.children && item.children.length > 0);
};

// Kiểm tra đơn giản nếu item đang active
const isActive = (item: MenuItem): boolean => {
  const itemId = item.id || item.to || item.path || item.route;
  return activeItemId.value === itemId;
};

// Xử lý click menu item
const handleClick = (item: MenuItem): void => {
  // Cập nhật active item
  activeItemId.value = item.id ?? item.to ?? item.path ?? item.route ?? null;
  // Xử lý navigation
  if (item.to && router) {
    router.push(item.to);
  } else if (item.href) {
    window.open(item.href, item.target || "_self");
  } else if (item.action && typeof item.action === "function") {
    item.action(item);
  }
  emit("item-click", item);
};

// Phát hiện mục active dựa trên route hiện tại
const updateActiveFromRoute = (): void => {
  const currentPath = route.path;

  // Tìm item active từ path hiện tại
  const findActive = (items: MenuItem[]): boolean => {
    for (const item of items) {
      const itemPath = item.to || item.path || item.route;

      if (itemPath) {
        const isPathActive = props.exactMatch
          ? itemPath === currentPath
          : currentPath.startsWith(itemPath);

        if (isPathActive) {
          activeItemId.value = item.id || itemPath;
          return true;
        }
      }

      // Kiểm tra children nếu có
      if (hasChildren(item) && findActive(item.children!)) {
        return true;
      }
    }

    return false;
  };

  findActive(props.menuItems);
};

// Theo dõi thay đổi route
watch(() => route.path, updateActiveFromRoute);

// Khởi tạo
onMounted(() => {
  updateActiveFromRoute();
});
</script>

<style scoped>
.menu-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-item {
  position: relative;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  color: var(--color-gray-700);
}

.menu-item-active {
  color: var(--color-primary-600);
  font-weight: 500;
}

.menu-item:hover {
  color: var(--color-primary-600);
}

.menu-icon {
  margin-left: 0.25rem;
  width: 1rem;
  height: 1rem;
}

.menu-popover {
  height: 100%;
  display: flex;
  align-items: center;
}

.submenu-panel {
  min-width: 12rem;
  padding: 0.25rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 30;
}

.submenu-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.submenu-item-active {
  background-color: var(--color-gray-100);
}

.submenu-item:hover {
  background-color: var(--color-gray-100);
}

.submenu-item-with-children {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submenu-icon {
  margin-left: 0.25rem;
  width: 1rem;
  height: 1rem;
}

.submenu-popover {
  width: 100%;
  position: relative;
}

.submenu-panel-l3 {
  min-width: 12rem;
  padding: 0.25rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 40;
}

.submenu-item-l3 {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.submenu-item-l3-active {
  background-color: var(--color-gray-100);
}

.submenu-item-l3:hover {
  background-color: var(--color-gray-100);
}

/* Dark mode styles */
:root.dark .menu-item {
  color: var(--color-gray-300);
}

:root.dark .menu-item-active {
  color: var(--color-primary-400);
}

:root.dark .menu-item:hover {
  color: var(--color-primary-400);
}

:root.dark .submenu-panel,
:root.dark .submenu-panel-l3 {
  background-color: var(--color-gray-800);
}

:root.dark .submenu-item-active,
:root.dark .submenu-item-l3-active {
  background-color: var(--color-gray-700);
}

:root.dark .submenu-item:hover,
:root.dark .submenu-item-l3:hover {
  background-color: var(--color-gray-700);
}
</style>