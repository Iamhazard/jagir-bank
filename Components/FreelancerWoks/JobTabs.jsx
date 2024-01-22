"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";

const JobTabs = () => {
  return (
    <div class="text-sm font-medium text-center text-green-600 border-b border-gray-300 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px">
        <li class="me-2">
          <a
            href="/bestmatches"
            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
            Best Matches
          </a>
        </li>
        <li class="me-2">
          <a
            href="/recentlyposted"
            class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
            aria-current="page">
            Recently Posted
          </a>
        </li>
        <li class="me-2">
          <a
            href="/recentlyposted"
            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
            Saved jobs
          </a>
        </li>
      </ul>
    </div>
  );
};

export default JobTabs;
