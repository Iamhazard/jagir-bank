"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import TopContent from "./TopContent";

import FreelancerWrapper from "./FreelancerWrapper";
import ProgresSlider from "./ProgresSlider";
import Profile from "./Profile";
import { usePathname } from "next/navigation";
import MobileAccording from "./mobileAccording";

interface JobsComponentProps {
  children: ReactNode;
}


const JobTabs = ({ children }: JobsComponentProps) => {
  const items = [
    { title: 'My Proposal', path: "/" },
    { title: 'My Profile', path: "/" },
    { title: 'My Project dasboard', path: "/" },
  ];

  const pathname = usePathname();




  return (
    <div className="max-w-[1400px] flex mx-auto gap-6 px-4 sm:px-6">
      <div className="flex-1">
        <div className="hidden lg:block">
          <TopContent />
        </div>

        <div className="lg:hidden">
          {items.map((item, index) => (
            <MobileAccording key={index} title={item.title} path={item.path} />
          ))}
        </div>


        <div className="text-sm font-medium text-center text-green-600 border-b border-gray-300 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap mb-px">
            <li className="me-2">
              <Link
                href="/bestmatches"
                className={`inline-block p-4 text-blue-600 border-b-2 border-transparent border-blue-600 rounded-t-lg dark:text-blue-500 dark ${pathname === "/recentlyposted"
                  ? "text-blue-600 border-blue-600 dark:text-blue-500"
                  : ""
                  }`}>
                Best Matches
              </Link>
            </li>
            <li className="me-2">
              <Link
                href="/recentlyposted"
                className={`inline-block p-4 text-blue-600 border-b-2 border-transparent border-blue-600 rounded-t-lg dark:text-blue-500 dark ${pathname === "/recentlyposted"
                  ? "text-blue-600 border-blue-600 dark:text-blue-500"
                  : ""
                  }`}
                aria-current="page">
                Recently Posted
              </Link>
            </li>
            <li className="me-2">
              <Link
                href="/savedjobs"
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${pathname === "/savedjobs"
                  ? "text-gray-600 border-gray-300 dark:text-gray-300"
                  : ""
                  }`}>
                {" "}
                Saved jobs
              </Link>
            </li>
          </ul>
        </div>
        {children}
      </div>
      <div className="mt-6 mx-auto w-full lg:w-1/3 lg:mx-0 hidden lg:block ">
        <div className="">
          <div className="md:flex hidden  ">
            <Profile />
          </div>

          <div className="mb-6 md:flex hidden ">
            <ProgresSlider />
          </div>
          <div className="mb-6 md:flex hidden lg:mx-auto">
            <FreelancerWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTabs;
