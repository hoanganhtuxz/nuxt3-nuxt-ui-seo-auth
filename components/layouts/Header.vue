<template>
  <header :class="['w-full', sticky ? 'sticky top-0 z-50' : '']">
    <div class="container mx-auto px-4">
      <!-- Desktop header -->
      <div class="hidden md:flex items-center justify-between h-16">
        <div class="flex items-center">
          <slot name="logo">
            <NuxtLink to="/" class="text-xl font-bold">Nuxt App</NuxtLink>
          </slot>
        </div>

        <!-- Desktop Menu -->
        <LayoutsMenu
          v-model="activeMenuId"
          :menu-items="HeaderMenu"
          @item-click="handleMenuItemClick"
        >
          <template #extra-nav-items>
            <slot name="extra-nav-items"></slot>
          </template>
        </LayoutsMenu>

        <!-- Right side actions -->
        <div class="flex items-center">
          <LayoutsAuth />
          <slot name="actions"></slot>
        </div>
      </div>

      <!-- Mobile header -->
      <div class="flex md:hidden items-center justify-between h-16">
        <div class="flex items-center">
          <slot name="logo-mobile">
            <slot name="logo">
              <div class="text-xl font-bold">Logo</div>
            </slot>
          </slot>
        </div>

        <div class="flex items-center gap-2">
          <!-- Auth component for mobile -->
          <LayoutsAuth />

          <!-- Mobile menu button -->
          <UButton
            icon="i-heroicons-bars-3"
            color="gray"
            variant="ghost"
            @click="openMobileMenu"
          />
        </div>
      </div>
    </div>

    <!-- Mobile menu slideover -->
    <USlideover v-model="isMobileMenuOpen" :width="mobileMenuWidth">
      <div class="h-full flex flex-col">
        <div class="flex items-center justify-between p-4 border-b">
          <slot name="mobile-menu-logo">
            <slot name="logo">
              <div class="text-xl font-bold">Logo</div>
            </slot>
          </slot>
          <UButton
            icon="i-heroicons-x-mark"
            color="gray"
            variant="ghost"
            @click="isMobileMenuOpen = false"
          />
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <!-- Mobile Menu Component -->
          <!-- <MobileMenu
            v-model="activeMenuId"
            :menu-items="menuItems"
            @item-click="handleMenuItemClick"
            @menu-close="isMobileMenuOpen = false"
          /> -->
        </div>

        <div class="p-4 border-t">
          <slot name="mobile-actions"></slot>
        </div>
      </div>
    </USlideover>
  </header>
</template>

<script lang="ts" setup>
import type { MenuItem } from "~/types/Menu";

interface HeaderProps {
  modelValue?: string | null;
  sticky?: boolean;
  mobileMenuWidth?: string;
  isAuthenticated?: boolean;
  user?: any;
}

const props = withDefaults(defineProps<HeaderProps>(), {
  modelValue: null,
  menuItems: () => [],
  sticky: false,
  mobileMenuWidth: "280px",
  isAuthenticated: false,
  user: null,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
  (e: "item-click", item: MenuItem): void;
  (e: "menu-open"): void;
  (e: "menu-close"): void;
  (e: "login"): void;
  (e: "logout"): void;
  (e: "profile"): void;
}>();

// State variables
const isMobileMenuOpen = ref(false);
const activeMenuId = computed({
  get: () => props.modelValue,
  set: (value: any) => emit("update:modelValue", value),
});

// Open mobile menu
const openMobileMenu = (): void => {
  isMobileMenuOpen.value = true;
  emit("menu-open");
};

// Handle menu item clicks
const handleMenuItemClick = (item: MenuItem): void => {
  emit("item-click", item);
};

// Auth handlers
const handleLogin = (): void => {
  emit("login");
};

const handleProfile = (): void => {
  emit("profile");
};
</script>

<style scoped>
header {
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

:root.dark header {
  background-color: var(--color-gray-900);
}
</style>
