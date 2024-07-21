'use client'
import Link from "next/link";
import Image from "next/image";
import { Chat } from "../types/chat";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

interface Job {
  dot: number;
  id: string;
  post: string;
  projectSize: string;
  from: string;
  to: string;
  createdAt: number;
  // Add other fields as needed
}
const ChatCard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/job");
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch jobs");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  //const formattedDate = format(createdAtDate, 'MMM d, yyyy');
  console.log(jobs, '')
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Recent Jobs
      </h4>

      <div>
        {jobs.map((chat, key) => {
          const createdAtDate = new Date(chat.createdAt);
          const formattedDate = format(createdAtDate, 'MMM d, yyyy');
          return (
            <Link
              href="/"
              className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
              key={key}
            >


              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    {chat.post}
                  </h5>
                  <p>
                    <span className="text-sm text-black dark:text-white">

                      {formattedDate}
                    </span>
                    <span className="text-xs">  min</span>
                  </p>
                </div>
                {chat.createdAt !== 0 && (
                  <div className="flex h-12 w-16 items-center justify-center rounded-full bg-primary">
                    <span className="text-sm font-medium text-white">

                      {chat.projectSize}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default ChatCard;
