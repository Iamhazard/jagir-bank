"use client";

import React from "react";

import Link from "next/link";
import { usePathname, useSearchParams, useSelectedLayoutSegment } from "next/navigation";

import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { UserButton } from "@/Components/auth/user-button";
import { Separator } from "@/Components/ui/separator";

const Headers = () => {
  const scrolled = useScroll(5);
  const searchParams = useSearchParams();
  const pathname = usePathname()


  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}>
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden">
            <span className="h-7 w-7 bg-green-600 rounded-lg" />
            <span className="font-bold text-xl flex ">JAGIRBANK</span>
          </Link>
        </div>

        <h1 className="text-2xl text-slate-700 font-medium font-sans">

          Dashboard {pathname}</h1>
        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;
