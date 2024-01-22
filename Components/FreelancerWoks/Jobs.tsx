"use client";
import Link from "next/link";
import React, { useState } from "react";

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

const Jobs = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <div
        className={`max-w-2xl max-h-[500px]   p-6 bg-gray-100 hover:bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${
          showMore ? "expanded" : ""
        }`}>
        <small className="text-gray-400 ">Posted 2 hours ago</small>
        <Link href="#">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Full-stack Developer for Metaverse Project
          </h5>
        </Link>
        <small className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Price fixed-Intermediate-Est.Budget:$10k
        </small>
        <div className="py-4">
          <p className="text-justify text-clip overflow-hidden line-clamp-3">
            We are seeking a talented and experienced Full-stack Developer to
            join our team for an exciting Metaverse project. As a Full-stack
            Developer, you will be responsible for developing and maintaining
            both front-end and back-end components of the project. You will
            collaborate with our team of designers and project managers to
            create immersive and interactive experiences.
          </p>
        </div>
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowMore(!showMore)}>
          {showMore ? "See Less" : "See More"}
        </span>
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
          <p>Place</p>
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
