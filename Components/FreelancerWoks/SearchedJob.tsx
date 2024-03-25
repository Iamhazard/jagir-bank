import React from "react";
import { Button } from "@/Components/ui/button";
import { MdOutlineCheckCircle, MdOutlineMoreTime } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { GiSkills } from "react-icons/gi";
import { format } from "date-fns";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface SearchedJobProps {
    id: string;
    title: string;
    jobdescription: string;
    from: string;
    to: string;
    duration: string;
    expertise: string;
    projectSize: string;
    fixed: string;
    skills: Array<{ title: string }>;
    createdAt: string;
    country: string;
}

const SearchedJob: React.FC<SearchedJobProps> = ({
    id,
    title,
    jobdescription,
    from,
    to,
    duration,
    expertise,
    projectSize,
    fixed,
    skills,
    createdAt,
    country,
}: SearchedJobProps) => {
    return (
        <div>
            <div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <small className="text-gray-400 ">
                    {format(new Date(createdAt), "E  h  a ")}
                </small>
            </div>
            <Separator />
            <div className="flex max-w-[800px]  gap-4">
                <div className="flex-1">
                    <p className="text-justify text-clip py-4">{jobdescription}</p>
                    <div className="mt-4">
                        <Separator />
                        <div className="py-10 mx-auto flex space-x-8">
                            <div>
                                <div className="flex gap-1 items-center">
                                    <MdOutlineMoreTime />
                                    <h1 className=""> More than 30</h1>
                                </div>
                                <small>{`Hourly:$${from}-$${to} `}</small>
                            </div>
                            <div>
                                <div className="flex gap-1 items-center">
                                    <CiCalendarDate />
                                    <h1>{duration}</h1>
                                </div>
                                <p> <small>{projectSize}</small></p>
                            </div>
                            <div>
                                <div className="flex gap-1 items-center">
                                    <GiSkills />
                                    <h1>{expertise}</h1>
                                </div>
                            </div>
                        </div>
                        <Separator />
                    </div>
                    <div className="py-6">
                        <h1 className="text-xl font-medium">Project type: One time project</h1>
                    </div>
                    <div>
                        <Separator />
                        <h1 className="py-2 px-1 text-md font-bold">Skills and Expertise</h1>
                        <div className="flex-1">
                            <h1>Front-End Development Deliverables</h1>
                            <div className=" flex py-2 gap-3">
                                <div className="flex gap-4 mt-4">
                                    {skills.map((skill, i) => (
                                        <Button
                                            key={i}
                                            variant='outline'
                                            className="bg-gray-400 max-h-10 rounded-3xl border-[1px] p-2 items-center">
                                            {skill.title}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="py-4">
                            <h4>Front-End Development Languages</h4>
                            <div className="flex gap-4 mt-4">
                                {skills.map((skill, i) => (
                                    <Button
                                        key={i}
                                        variant='outline'
                                        className="bg-gray-400 max-h-10 rounded-3xl border-[1px] p-2 items-center">
                                        {skill.title}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="py-4">
                        <h1>Activity on this job</h1>
                        <div className="flex-col flex">
                            <small>Proposals: 50+</small>
                            <small>Last viewed by client: 7 hours ago</small>
                        </div>
                    </div>
                </div>
                <div>
                    <Separator orientation="vertical" />
                </div>
                <div className="w-[200px] mt-4 items-center">
                    <div className=" space-y-4">
                        <Link href={`/proposal/job/${id}`}>
                            <Button type="submit" variant="btn_green">
                                Apply Now
                            </Button>
                        </Link>
                        <Button type="submit" variant="outline">
                            Save jobs
                        </Button>
                    </div>
                    <p className="py-2 text-gray-600 ">
                        <small>Required connection to submit a proposal: 8</small>
                    </p>
                    <p className="text-gray-600">
                        <small>Available Connections: 120</small>
                    </p>
                    <div className="py-4 ">
                        <h1 className="text-xl font-medium">About the Client</h1>
                        <div className="py-2 space-y-3">
                            <span className="flex gap-2">
                                <MdOutlineCheckCircle size={18} color="green" />
                                <small className="text-gray-600">Payment verified</small>
                            </span>
                            <p className=" text-gray-600 ">
                                <small>Review</small>
                            </p>
                            <p className="text-gray-600">
                                <small>{country}</small>
                            </p>
                            <small className="text-gray-600">
                                jobs posted
                                <p className="text-gray-600">98% hire rate, 1 open job</p>
                            </small>
                            <small className="text-gray-600">
                                total spent
                                <p className="text-gray-600">243 hires, 3 active</p>
                            </small>
                            <small className="text-gray-600 ">
                                /hr avg hourly rate paid
                            </small>
                            <small className="text-gray-600">Large company</small>
                            <small className="text-gray-600">

                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchedJob;
