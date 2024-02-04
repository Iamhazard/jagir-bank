import Link from "next/link";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";

const ClientJobs = () => {
  const {
    formState: { errors },
  } = useForm();

  const { register } = useFormContext();
  return (
    <>
      <div className="flex justify-between gap-10">
        <div className=" max-w-[200px]">
          <small>Job Post</small>
          <h1 className="text-2xl">Start the conversation</h1>

          <p className=" py-2 text-sm font-semibold text-gray-900 dark:text-white">
            Talents are looking for:
          </p>
          <ul className=" space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            <li>
              <small>The skills required for your work</small>
            </li>
            <li>
              <small>Clear expectations about your task or deliverables.</small>
            </li>
            <li>
              <small>Details about how you or your team like to work.</small>
            </li>
          </ul>
        </div>
        <div className="flex-1 mt-6">
          <h2>Describe what you need</h2>

          <>
            <textarea
              rows={12}
              id="jobDescription"
              {...register("jobDescription")}
              className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                errors.jobDescription ? "border-red-500" : ""
              }`}
              placeholder="Describe the jobs"
            />
            {errors.jobDescription && (
              <p className="text-red-500 text-sm">enter</p>
            )}
          </>
        </div>
      </div>
      <div className="flex items-center justify-center py-2">
        <span>
          <Link href="/">Need help?</Link>
        </span>
        <p>see some examples!</p>
      </div>
    </>
  );
};

export default ClientJobs;
