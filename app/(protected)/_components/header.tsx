'use client'
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { UserButton } from "@/Components/auth/user-button";


const Headers = () => {
  const scrolled = useScroll(5);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        ` inset-x-0 top-0 z-30 w-full transition-all h-12`,
        {
          "border-b border-gray-100 ": scrolled,
          "border-b border-gray-100": selectedLayout,
        }
      )}
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex flex-row space-x-3 px-6 items-center justify-center md:hidden">
            <span className="h-7 w-7 bg-green-600 rounded-lg" />
            <span className="font-bold text-xl flex ">JAGIRBANK</span>
          </Link>
        </div>

        <h1 className="text-2xl hidden md:flex  text-slate-700 font-medium font-sans">
          Dashboard {pathname}
        </h1>

        <div className="hidden md:flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Headers;
