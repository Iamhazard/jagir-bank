"use client";
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/Components/ui/button";
import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
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

const JobSheet = () => {
    const [showMore, setShowMore] = useState(false);
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div>
                    <Jobs />
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        {" "}
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Full-stack Developer for Metaverse Project
                        </h5>
                    </SheetTitle>
                    <SheetDescription>
                        <small className="text-gray-400 ">Posted 2 hours ago</small>
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <Separator />

                    <div className="flex max-w-[800px]  gap-4 ">
                        <div className="flex-1">
                            <p className=" text-justify text-clip py-4">
                                We are seeking a talented and experienced Full-stack Developer
                                to join our team for an exciting Metaverse project. As a
                                Full-stack Developer, you will be responsible for developing and
                                maintaining both front-end and back-end components of the
                                project. You will collaborate with our team of designers and
                                project managers to create immersive and interactive
                                experiences. We are seeking a talented and experienced
                                Full-stack Developer to join our team for an exciting Metaverse
                                project. As a Full-stack Developer, you will be responsible for
                                developing and maintaining both front-end and back-end
                                components of the project. You will collaborate with our team of
                                designers and project managers to create immersive and
                                interactive experiences.
                            </p>
                            <div className="mt-4">
                                <Separator />
                                <div className="py-10 mx-auto flex space-x-8">
                                    <div>
                                        <div className="flex gap-1 items-center">
                                            <MdOutlineMoreTime />
                                            <h1 className="">  More than 30</h1>

                                        </div>
                                        <small>hourly</small>
                                    </div>
                                    <div>
                                        <div className="flex gap-1 items-center">
                                            <CiCalendarDate />
                                            <h1>3 to 6 months</h1>

                                        </div>
                                        <p> <small>Project Length</small></p>
                                    </div>
                                    <div>
                                        <div className="flex gap-1 items-center">

                                            <GiSkills />

                                            <h1>Expert</h1>

                                        </div>


                                    </div>
                                </div>

                                <Separator />
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
                                        <small>Country</small>
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
