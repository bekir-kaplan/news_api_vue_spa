export interface IMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  submenu?: IMenuItem[];
}

export interface INavigation {
  menu: IMenuItem[];
}
