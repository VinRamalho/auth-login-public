import { HomeOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Home", "2", <HomeOutlined />),
];
