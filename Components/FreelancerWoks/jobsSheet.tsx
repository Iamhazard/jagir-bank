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
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Freelancer } from "../auth/exeProfile";





export interface JobSheetProps {
    proposals: Proposal[]
    id: string,
    title: string,
    country: string,
    userId: string,
    jobdescription?: string;
    jobsbudget?: string;
    duration: string,
    expertise: string,
    projectSize: string,
    fixed: string,
    Place: string,
    from: string,
    clientProfileId: string,
    to: string,
    post: string,
    jobDescription: string,
    clientProfile?: {
        country: string;
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
    };
    createdAt: string,
    skills: Array<{ title: string }>;

}

type Proposal = {
    id: string;
    duration: string | null;
    Coverletter: string | null;
    hourlyRate: string | null;
    estimatedAmount: string | null;
    serviceFee: number;
    image: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    jobId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    clientProfileId: string;
};




const JobSheet: React.FC<JobSheetProps> = ({ title, jobdescription, from, to, Place, fixed, duration, expertise, projectSize, id, skills, createdAt, country, clientProfileId, userId, clientProfile }: JobSheetProps) => {
    const [showMore, setShowMore] = useState(false);
    const { data: session } = useSession()
    const formattedTime = format(createdAt, 'HH:mm:ss');
    const [error, setError] = useState(null);
    const [freelancer, setFreelancer] = useState<Freelancer[] | null>(null)
    const [getcountry, setCountry] = useState("")
    console.log(Jobs, "form jobs sheet")

    useEffect(() => {
        const fetchFreelancerProfile = async () => {
            try {
                const response = await fetch(`/api/client/getProfile/66050cc05cefa668dee8dbce`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setFreelancer(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (userId) {
            fetchFreelancerProfile();
        }
    }, [userId]);




    return (
        <div className="">
            <Sheet>
                <SheetTrigger asChild>
                    <div className="">
                        <Jobs id={id} title={title} to={to} from={from} jobsdescription={jobdescription || ""} Place={Place} duration={duration || ""} expertise={expertise} projectSize={projectSize} fixed={fixed} skills={skills} createdAt={createdAt} country={country} userId={userId} clientProfileId={clientProfileId} />
                    </div>
                </SheetTrigger>
                <SheetContent >
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
                            <div className="w-full sm:w-[200px] mt-4 items-center">
                                <div className=" space-y-4">
                                    <SheetClose asChild>
                                        <Link href={`/proposal/job/${id}`}>
                                            <Button type="submit" variant="btn_green">
                                                Apply Now
                                            </Button>
                                        </Link>

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
                                    <h1 className="text-sm font-medium">About the Client</h1>
                                    <Link href='/' className="hover:underline font-bold  text-gray-800 py-1 px-2">
                                        <p className="text-sm">{`${session?.user.name} ${session?.user.lastName}`}</p>

                                    </Link>
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
                                        {""}
                                        <small className="text-gray-600">
                                            Member since {new Date(createdAt).getFullYear()}
                                            <p>
                                                {formattedTime}
                                            </p>
                                        </small>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default JobSheet;


