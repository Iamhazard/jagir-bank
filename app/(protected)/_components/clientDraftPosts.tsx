'use client'
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";

import React from "react";
import SpeedDial from "./SpeedDial";
import { useRouter } from "next/navigation";

type JobPost = {
    id: React.Key | null | undefined;
    jobName: string;
    created: string;
};

const jobsPosted = [
    {
        id: 1,
        jobName: "Web Developer",
        created: "2024-02-18",
    },
    {
        id: 2,
        jobName: "Graphic Designer",
        created: "2024-02-17",
    },
];

const ClientDraftPosts: React.FC<JobPost> = () => {
    const route = useRouter()

    const onDraftClick = () => {
        route.push("/clientdashboard/draftPost/id")

    }
    return (
        <section className="mt-6">
            <div className="flex w-[500px] items-center justify-center py-6">
                <form>
                    <div className=" relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="inline-flex w-[400px] p-2.5 ps-10 rounded-full text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                            required
                        />
                        <Button
                            className=" absolute end-2.5 bottom-1"
                            variant="outline"
                            size="sm">
                            Search
                        </Button>
                    </div>
                </form>
            </div>
            <Separator />
            <div>
                {jobsPosted &&
                    jobsPosted.map((jobsPost) => (
                        <div key={jobsPost.id} className="hover:bg-slate-100">
                            <div className="flex justify-between py-4 px-6 ">
                                <div>
                                    <h1>{jobsPost?.jobName}</h1>
                                    <p>Created </p>
                                </div>

                                <div className="flex gap-1 items-center px-5 ">
                                    <Button onClick={onDraftClick} variant="btn_green"> Edit Draft</Button>

                                    <SpeedDial />
                                </div>
                            </div>

                            <p className="px-6">Draft</p>
                            <Separator />
                        </div>

                    ))}

            </div>


        </section>
    );
};

export default ClientDraftPosts;
