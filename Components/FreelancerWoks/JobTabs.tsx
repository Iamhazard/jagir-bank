"use client";

import React from "react";
import Link from "next/link";
import TopContent from "./TopContent";

import FreelancerWrapper from "./FreelancerWrapper";
import ProgresSlider from "./ProgresSlider";
import Profile from "./Profile";
import { useRouter, useSearchParams } from "next/navigation";

const JobTabs = ({ children }) => {
  const params = useSearchParams();
  const router = useRouter();
  const isActive = (path) => params.asPath === path;

  return (
    <div className="max-w-[1400px] flex mx-auto gap-6">
      <div className="flex-1">
        <TopContent />
        <div className="text-sm font-medium text-center text-green-600 border-b border-gray-300 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap mb-px">
            <li className="me-2">
              <Link
                href="/bestmatches"
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                  isActive("/bestmatches")
                    ? "text-gray-600 border-gray-300 dark:text-gray-300"
                    : ""
                }`}>
                Best Matches
              </Link>
            </li>
            <li className="me-2">
              <Link
                href="/recentlyposted"
                className={`inline-block p-4 text-blue-600 border-b-2 border-transparent border-blue-600 rounded-t-lg dark:text-blue-500 dark ${
                  router.pathname === "/recentlyposted"
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
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                  params.pathname === "/savedjobs"
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
      <div className="w-[280px] mt-6">
        <div className="">
          <div>
            <Profile />
          </div>

          <div className="mb-6">
            <ProgresSlider />
          </div>
          <div className="mb-6">
            <FreelancerWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTabs;
