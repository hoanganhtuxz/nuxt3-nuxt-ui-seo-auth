export interface MenuItem {
  id?: string;
  label: string;
  to?: string;
  path?: string;
  route?: string;
  href?: string;
  target?: string;
  icon?: string;
  children?: MenuItem[];
  action?: (item: MenuItem) => void;
  [key: string]: any;
}

export interface HeaderProps {
  modelValue?: string | null;
  menuItems: MenuItem[];
  activeRoute?: string | null;
  sticky?: boolean;
  mobileMenuWidth?: string;
  autoDetectActive?: boolean;
  exactMatch?: boolean;
  defaultActiveIndex?: number | null;
}
