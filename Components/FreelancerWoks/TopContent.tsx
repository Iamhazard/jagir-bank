import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { JobSheetProps } from "./jobsSheet";

const TopContent = () => {
  const { data: session } = useSession()
  //console.log(session)
  const [jobs, setJob] = useState<JobSheetProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        //const response = await fetch(`/api/skill/${id}`);
        const response = await fetch(`/api/job`);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    };


    fetchJobs();
  }, []);
  return (
    <div className="w-[952px]">
      <h1 className="text-3xl font-sans font-extrabold py-4 right-0 ">
        Hi {session?.user.name}! {""}👋{" "}
      </h1>
      <div className="flex">
        <form className="w-[952px]">
          <input
            type="search"
            className="w-full p-2  ps-10 text-sm text-gray-900 border rounded-3xl border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for jobs..."
            required
          />
        </form>
      </div>
      <h1 className="text-2xl font-serif font-semibold py-4">
        Jobs recommended for you
      </h1>
    </div>
  );
};

export default TopContent;
