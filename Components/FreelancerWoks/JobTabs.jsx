"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Jobs from "./Jobs";
import Link from "next/link";

const JobTabs = () => {
  return (
    <div>
      <div className="text-sm font-medium text-center text-green-600 border-b border-gray-300 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <Link
              href="/bestmatches"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              Best Matches
            </Link>
          </li>
          <li className="me-2">
            <Link
              href="/recentlyposted"
              className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
              aria-current="page">
              Recently Posted
            </Link>
          </li>
          <li className="me-2">
            <Link
              href="/recentlyposted"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              Saved jobs
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobTabs;
