import { Icon } from "@/components/icon/interface";

export interface MenuItem {
  label: string;
  icon: Icon | any;
  href: string;
}

export interface MenuItemSelected {
  paths: string[];
}
