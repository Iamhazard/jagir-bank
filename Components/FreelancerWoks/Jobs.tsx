"use client";
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineCheckCircle } from "react-icons/md";

export interface jobsProps {
  id: string | undefined;
  title: string,
  from: string,
  country: string,
  to: string,
  jobsdescription: string,
  duration: string,
  expertise: string,
  projectSize: string,
  fixed: string,
  Place: string,
  createdAt: string

  skills: Array<{ title: string }>;
}


const Jobs = ({ title, id, from, to, jobsdescription, Place, duration, expertise, projectSize, fixed, skills, createdAt, country }: jobsProps) => {
  const [showMore, setShowMore] = useState(false);
  const [skill, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchSkills = async () => {
      try {
        //const response = await fetch(`/api/skill/${id}`);
        const response = await fetch(`/api/skill/skillByJob/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch skills');
        }
        const data = await response.json();
        setSkills(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    };


    fetchSkills();
  }, [id]);

  //console.log("data", skill)
  return (

    <div className="w-full max-w-full px-2 sm:px-4 lg:px-8">
      <div
        className={`w-full max-w-sm md:max-w-[800px] lg:max-w-[950px] max-h-[500px] p-4 sm:p-6 md:p-8 bg-white hover:bg-[#F2F7F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${showMore ? "expanded" : ""}`}>
        <small className="text-gray-400 block mb-2">
          Posted {format(new Date(createdAt), "E h a ")}
        </small>
        <Link href="#">
          <h5 className="mb-2 text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <small className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {`Hourly: $${from} - $${to} - Fixed: $${fixed} - ${expertise}`}
        </small>
        <div className="py-3">
          <p
            className={clsx(
              "text-justify text-clip overflow-hidden",
              showMore ? "line-clamp-auto" : "line-clamp-3 sm:line-clamp-2"
            )}>
            {jobsdescription}
          </p>
        </div>
        <p
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowMore(!showMore)}>
          {showMore ? "See Less" : "See More"}
        </p>
        <div className="flex gap-2 flex-wrap mt-3">
          {skills.map((skill, i) => (
            <button
              key={i}
              className="bg-gray-400 max-h-10 rounded-3xl border-[1px] p-2 flex items-center">
              {skill.title}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap mt-6">
          <span className="flex items-center gap-2">
            <MdOutlineCheckCircle size={18} color="green" />
            <small className="text-gray-600">Payment verified</small>
          </span>
          <p>$2k + spent</p>
          <span className="flex items-center gap-2">
            <FiMapPin /> {Place}
          </span>
        </div>
        <div className="flex flex-wrap mt-4 gap-2">
          <p>Proposals: 50+</p>
          <p>Connects to apply: 12 Connects</p>
        </div>
      </div>
    </div>


  );
};

export default Jobs;
