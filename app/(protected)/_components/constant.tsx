import { Icon } from "@iconify/react";

import { SideNavItem } from "@/@types/enum";

const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/clientdashboard",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },

  {
    title: "Messages",
    path: "/messages",
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
];
export default SIDENAV_ITEMS;
