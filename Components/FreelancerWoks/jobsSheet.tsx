"use client";
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/Components/ui/button";
import React, { useEffect, useState } from "react";

import { MdOutlineCheckCircle, MdOutlineMoreTime } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { GiSkills } from "react-icons/gi";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";

import Jobs from "./Jobs";
import { Separator } from "../ui/separator";
import { format } from "date-fns";






export interface JobSheetProps {
    id: string,
    title: string,
    country: string,
    jobdescription?: string;
    jobsbudget?: string;
    duration: string,
    expertise: string,
    projectSize: string,
    fixed: string,
    Place: string,
    from: string,
    to: string,
    post: string,
    jobDescription: string,
    createdAt: string,
    skills: Array<{ title: string }>;

}



const JobSheet: React.FC<JobSheetProps> = ({ title, jobdescription, from, to, Place, fixed, duration, expertise, projectSize, id, skills, createdAt, country }: JobSheetProps) => {
    const [showMore, setShowMore] = useState(false);
    const [clientdata, setClientData] = useState<JobSheetProps[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchClient = async () => {
            try {
                //const response = await fetch(`/api/skill/${id}`);
                const response = await fetch(`/api/profile/clientProfile`);
                if (!response.ok) {
                    throw new Error('Failed to fetch client');
                }
                const data = await response.json();
                setClientData(data);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        };


        fetchClient();
    }, []);

    //console.log("first", clientdata)
    return (
        <Sheet>
            <SheetTrigger asChild>

                <div>
                    <Jobs id={id} title={title} to={to} from={from} jobsdescription={jobdescription || ""} Place={Place} duration={duration || ""} expertise={expertise} projectSize={projectSize} fixed={fixed} skills={skills} createdAt={createdAt} country={country} />
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <div>
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {title}
                            </h5>
                        </div>


                    </SheetTitle>
                    <SheetDescription>
                        <small className="text-gray-400 "> {format(new Date(createdAt), "E  h  a ")}</small>
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <Separator />

                    <div className="flex max-w-[800px]  gap-4 ">
                        <div className="flex-1">
                            <p className=" text-justify text-clip py-4">
                                {jobdescription}
                            </p>
                            <div className="mt-4">
                                <Separator />
                                <div className="py-10 mx-auto flex space-x-8">
                                    <div>
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineMoreTime />
                                            <h1 className="">  More than 30</h1>

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
                                <h1 className="text-xl font-medium">Project type:One time project</h1>

                            </div>
                            <div>
                                <Separator />
                                <h1 className="py-2 px-1 text-md font-bold">
                                    Skills and Expertise
                                </h1>
                                <div className="flex-1">
                                    <h1>
                                        Front-End Development Deliverables
                                    </h1>
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
                                    <small>Proposals:
                                        50+</small> {""}
                                    <small>Last viewed by client:
                                        7 hours ago</small>

                                </div>
                            </div>

                        </div>

                        <div>
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-[200px] mt-4 items-center">
                            <div className=" space-y-4">
                                <SheetClose asChild>
                                    <Button type="submit" variant="btn_green">
                                        Apply Now
                                    </Button>
                                </SheetClose>

                                <Button type="submit" variant="outline">
                                    Save jobs
                                </Button>
                            </div>

                            <p className="py-2 text-gray-600 ">
                                <small>Requied connection to submit a proposal:8</small>
                            </p>
                            <p className="text-gray-600">
                                {" "}
                                <small>Available Connections:120</small>
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
                                        {" "}
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
                                        Member since January 2022
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default JobSheet;
