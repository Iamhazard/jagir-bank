"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import SIDENAV_ITEMS, { SIDENAV_ATTRIBUTE, SIDENAV_ITEM } from "./constant";
import { SideNavItem } from "@/@types/enum";
import { Button } from "@/Components/ui/button";

const SideNavAdmin = () => {
  const pathname = usePathname();

  return (
    <div className="md:w-[280px] bg-gray-400 h-screen flex-1 fixed border-r border-zinc-600 hidden md:flex overflow-y-auto ">
      <div className="flexflex-col space-y-0.5 w-full ">
        <div className="">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b h-12 border-zinc-200 w-full">
            <span className="h-7 w-7 bg-green-600 rounded-lg" />
            <span className="font-bold text-xl hidden md:flex">JAGIRBANK</span>

          </Link>
        </div>


        <div className="flex flex-col  md:px-6 gap-1.5 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
        <div className="flex flex-col gap-1.5 px-1.5 md:px-6">
          <span className="font-semibold text-xl py-2 flex text-red-700">LANGUAGES</span>
          {SIDENAV_ITEM.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
        <div className="flex flex-col gap-1.5 px-2 md:px-6">
          <span className="font-semibold text-xl py-2flex text-red-700">
            JOB ATTRIBUTES</span>
          {SIDENAV_ATTRIBUTE.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNavAdmin;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <Button
            variant='outline'
            onClick={toggleSubMenu}
            className={`${subMenuOpen ? 'bg-green-800' : 'bg-gray-200'} flex flex-row items-center p-2 rounded-lg hover-bg-zinc-600 w-full justify-between hover:bg-zinc-300 ${pathname?.includes(item.path) ? "bg-zinc-100" : ""
              }`}>
            <div className="flex flex-row space-x-1.5 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </Button>

          {subMenuOpen && (

            <div className="my-2 ml-6 flex flex-col space-y-4 ">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${subItem.path === pathname ? "font-bold " : ""
                      }`}>
                    <Button variant='btn_green' size='sm'>{subItem.title}</Button>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${item.path === pathname ? "bg-zinc-100" : ""
            }`}>
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>

      )}
      <h1 className="text-2xl hidden sm:text-xl lg:text-clip lg:w-1/2 text-slate-700 font-medium font-sans">
        Dashboard {pathname}
      </h1>
    </div>
  );
};
