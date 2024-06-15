import { Icon } from "@iconify/react";

import { SideNavItem } from "@/@types/enum";

export const SIDENAV_ATTRIBUTE: SideNavItem[] = [
  {
    title: "Skills",
    path: "/admin/skills",
    icon: <Icon icon="lucide:Pickaxe" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Skills", path: "/admin/Skills/add" },
      { title: "View Skills", path: "/admin/language" },

    ],
  },
  {
    title: "Professions",
    path: "/jobs",
    icon: <Icon icon="lucide:Pickaxe" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Profession", path: "/admin/profession" },

    ],
  },
  {
    title: "Industry types",
    path: "/admin/industry",
    icon: <Icon icon="lucide:factory" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "View Industry", path: "/admin/users" },
    ],
  },
  {
    title: "Organization",
    path: "/admin/organization",
    icon: <Icon icon="lucide:building" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add New Organization", path: "/admin/organization" },


    ],
  },

  {
    title: "Salary Type",
    path: "/admin/salary",
    icon: <Icon icon="lucide:money" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Salary ", path: "/admin/salary" },

    ],
  },
  {
    title: "Education",
    path: "",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add new Testimonial ", path: "/admin/faqs/new" },
      { title: "List Testimonial", path: "/admin/faqs" },
      { title: "sort Testimoniial", path: "/admin/faqs" },
    ],
  },
  {
    title: "Experience",
    path: "",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add new Testimonial ", path: "/admin/faqs/new" },
      { title: "List Testimonial", path: "/admin/faqs" },
      { title: "sort Testimoniial", path: "/admin/faqs" },
    ],
  },
  {
    title: "Job types",
    path: "",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add new Testimonial ", path: "/admin/faqs/new" },
      { title: "List Testimonial", path: "/admin/faqs" },
      { title: "sort Testimoniial", path: "/admin/faqs" },
    ],
  },
];

const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <Icon icon="lucide:Dashboard" width="24" height="24" />,
  },

  {
    title: "Category",
    path: "/admin/dashboard/category",
    icon: <Icon icon="lucide:category" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "ViewCategory", path: "/admin/dashboard/category" },
      { title: "Add Blog", path: "/admin/blog/new" },
    ],
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: <Icon icon="lucide:Jobs" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "List Jobs", path: "/settings/account" },
      { title: "Add new Jobs", path: "/settings/privacy" },
      { title: "Job Modules", path: "/settings/privacy" },
    ],
  },
  {
    title: "User Profie",
    path: "/admin/users",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "List of Users", path: "/admin/users" },
      { title: "Add New User Profile", path: "/admin/user/addUsers" },
    ],
  },
  {
    title: "Companies",
    path: "/companies",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "List Companies", path: "/settings/account" },
      { title: "Add NewComapny", path: "/settings/privacy" },
      { title: "List of Payment History", path: "/settings/privacy" },
      { title: "List of Manpowew", path: "/settings/privacy" },
    ],
  },
  {
    title: "SEO",
    path: "/seo",
    icon: <Icon icon="lucide:Dashboard" width="24" height="24" />,
  },
  {
    title: "FAQs",
    path: "/admin/faqs",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add New FAQ ", path: "/admin/faqs/new" },
      { title: "Sort FAQs", path: "/admin/faqs" },
    ],
  },
  {
    title: "Testimonials",
    path: "",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add new Testimonial ", path: "/admin/faqs/new" },
      { title: "List Testimonial", path: "/admin/faqs" },
      { title: "sort Testimoniial", path: "/admin/faqs" },
    ],
  },
];
export const SIDENAV_ITEM: SideNavItem[] = [
  {
    title: "Languages",
    path: "/admin/language",
    icon: <Icon icon="lucide:category" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "list Languages", path: "/admin/language" },
      { title: "Add New Language", path: "/admin/language" },

    ],
  },
  {
    title: "Countries",
    path: "/jobs",
    icon: <Icon icon="lucide:Jobs" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "List a countries", path: "/settings/account" },
      { title: "Add New Country", path: "/settings/privacy" },

    ],
  },
  {
    title: "Country Details",
    path: "/admin/users",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "List of Country details", path: "/admin/users" },
    ],
  },
  {
    title: "States",
    path: "/companies",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add New State", path: "/settings/account" },
      { title: "List New State", path: "/settings/privacy" },

    ],
  },

  {
    title: "Cities",
    path: "/admin/faqs",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "List Cities ", path: "/admin/faqs/new" },
      { title: "Add New Cities", path: "/admin/faqs" },
    ],
  },
  {
    title: "Testimonials",
    path: "",
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add new Testimonial ", path: "/admin/faqs/new" },
      { title: "List Testimonial", path: "/admin/faqs" },
      { title: "sort Testimoniial", path: "/admin/faqs" },
    ],
  },
];
export default SIDENAV_ITEMS;
