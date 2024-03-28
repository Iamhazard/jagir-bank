import { Icon } from "@iconify/react";

import { SideNavItem } from "@/@types/enum";

const NAV_ITEMS: SideNavItem[] = [
    {
        title: "Home",
        path: "/",
        icon: <Icon icon="lucide:home" width="24" height="24" />,
    },
    {
        title: "Find a jobs",
        path: "#",
        icon: <Icon icon="lucide:Account" width="24" height="24" />,
        submenu: true,
        subMenuItems: [
            { title: "  Find Logo designing Posts!", path: "/auth/login" },
            { title: " Post Articles & blog posts .", path: "/" },
            { title: " Post Articles & blog posts .", path: "/" },
            { title: "  Find a job related to SEO. .", path: "/" },
            { title: " Post Articles & blog posts .", path: "/" },
        ],
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
    {
        title: "Why JagirBank",
        path: "",
        icon: <Icon icon="lucide:mail" width="24" height="24" />,
    },
    {
        title: "Ways to Earn Money",
        path: "",
        icon: <Icon icon="lucide:mail" width="24" height="24" />,
    },

];
export default NAV_ITEMS;
