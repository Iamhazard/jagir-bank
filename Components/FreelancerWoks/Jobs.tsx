"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";

const skillbutton = [
  {
    name: "Javascript",
  },
  {
    name: "Webdevelopmet",
  },
  {
    name: " Next js",
  },
];

export interface jobsProps {
  id: string | undefined;
  title: string,
  jobsbudget: string,
  jobsdescription: string,
  Place: string,
}

const Jobs = ({ title, jobsbudget, jobsdescription, Place }: jobsProps) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <div
        className={`max-w-[950px] max-h-[500px]   p-6 bg-[#ffffff] hover:bg-[#F2F7F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${showMore ? "expanded" : ""
          }`}>
        <small className="text-gray-400 ">Posted 2 hours ago</small>
        <Link href="#">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <small className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {jobsbudget || " Price fixed-Intermediate-Est.Budget:$10k"}
        </small>
        <div className="py-4">
          <p
            className={clsx(
              "text-justify text-clip overflow-hidden",
              showMore ? "line-clamp-auto" : "line-clamp-3"
            )}>
            {jobsdescription}
          </p>
        </div>
        <p
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowMore(!showMore)}>
          {showMore ? "See Less" : "See More"}
        </p>
        <div className="flex gap-4 mt-4">
          {skillbutton.map((btn, i) => (
            <button
              key={i}
              className="bg-gray-400 max-h-10 rounded-3xl border-[1px] p-2 items-center">
              {btn.name}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          <p>Paymant Verified</p>
          <p>$2k + spent</p>

          <span className="flex gap-2">
            <FiMapPin /> {Place}
          </span>
        </div>
        <div className="flex flex-1 mt-4 gap-4">
          <p>Proposals: 50+</p>
          <p>Connects to apply: 12 Connects</p>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
