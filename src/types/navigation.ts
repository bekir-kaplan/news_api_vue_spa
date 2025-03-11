export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  submenu?: MenuItem[];
}

export interface Navigation {
  menu: MenuItem[];
}
