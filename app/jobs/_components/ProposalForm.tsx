/* eslint-disable react/no-unescaped-entities */
import React from "react";

import MaxWidthWrapper from "@/app/(protected)/_components/maxwidthWrappers";
import { Card, CardFooter } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";

const ProposalForm = () => {
    const fixed = 1
    return (
        <MaxWidthWrapper className={cn("gap-6 pb-10")}>
            <h1 className="py-4 px-6 text-3xl font-bold">Submit a new proposal</h1>
            <Card className="py-3  space-y-4">
                <div className="px-6 space-y-4">
                    <h1 className="font-bold text-2xl">Proposal settings</h1>

                    <div className="w-[120px]">
                        <Input />
                    </div>

                    <p>This proposal requires 4 connections</p>
                    <p>
                        When you submit this proposal, you'll have 116 Connects remaining.
                    </p>
                </div>
            </Card>
            <Card className="py-3  mt-6">
                <div className="px-6 space-y-4">
                    <h1 className="font-bold text-2xl">job details</h1>
                    <div className=" flex ">
                        <div className="flex-1 space-y-2">
                            <h2>UI Developer need for react project</h2>
                            <Badge variant="success" className="p-2 ">
                                Front-End Development
                            </Badge>
                            <small className="px-4">Posted </small>
                            <p className="py-4">ad</p>
                        </div>

                        <div>
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-[400px] px-6">
                            <h1 className="mr-6">Entry</h1>
                            <h1>Price</h1>
                            <h1>duration</h1>
                        </div>
                    </div>
                </div>
            </Card>
            <Card className="mt-6 py-3">
                <div className="px-6 space-y-4 w-[900px]">
                    <h1 className="font-bold text-2xl">Terms</h1>

                    <div className="flex justify-between items-center">
                        <h2>What is the rate you'd like to bid for this job?</h2>
                        {fixed ? (<small>Client’s budget: $35.00 - $75.00</small>) : (<></>)}
                    </div>
                    <small>Your profile rate: $7.00/hr</small>
                    {!fixed ? (
                        <div>
                            <div className="flex pb-4 justify-between gap-4 items-center">
                                <div>
                                    {" "}
                                    <h1 className="text-xl flex-1 font-serif">Hourly rate</h1>
                                    <p className="text-gray-500">
                                        {" "}
                                        Total amount client will see.
                                    </p>
                                </div>

                                <div className=" flex gap-0.5 items-center">
                                    <input
                                        type="text"
                                        id="hourlyrate"
                                        autoComplete=""
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="text-gray-500">/hr</span>
                                </div>
                            </div>

                            <div className="flex pb-4 justify-between gap-4 items-center">
                                <div>
                                    <h1 className="text-xl flex-1 font-serif">Services fee</h1>
                                    <p className="text-gray-500">
                                        {" "}
                                        This helps to run platform and provide protection
                                    </p>
                                </div>
                                <div className="mt-2 flex gap-0.5 items-center">
                                    <input
                                        type="text"
                                        id="disabled-input"
                                        aria-label="disabled input"
                                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="$2"
                                        disabled
                                    />
                                    <span className="text-gray-500">/hr</span>
                                </div>
                            </div>

                            <div className="flex pb-4 justify-between gap-4 items-center">
                                <div>
                                    <h1 className="text-xl flex-1 font-serif">You ll get</h1>
                                    <p className="text-gray-500">
                                        This estimated amount you ll receive .
                                    </p>
                                </div>
                                <div className="mt-2 flex gap-0.5 items-center">
                                    <input
                                        id="estimatedamount"
                                        type="text"
                                        autoComplete=""
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="text-gray-500">/hr</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex pb-4 justify-between gap-4 items-center">
                                <div>
                                    {" "}
                                    <h1 className="text-xl flex-1 font-serif">Bid</h1>
                                    <p className="text-gray-500">
                                        {" "}
                                        Total amount client will see.
                                    </p>
                                </div>

                                <div className=" flex gap-0.5 items-center">
                                    <input
                                        type="text"
                                        id="bid"
                                        autoComplete=""
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="text-gray-500">/hr</span>
                                </div>
                            </div>

                            <div className="flex pb-4 justify-between gap-4 items-center">
                                <div>
                                    <h1 className="text-xl flex-1 font-serif">Services fee</h1>
                                    <p className="text-gray-500"> 10% FreeLancer services fee</p>
                                </div>
                                <div className="mt-2 flex gap-0.5 items-center">
                                    <input
                                        type="text"
                                        id="disabled-input"
                                        aria-label="disabled input"
                                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="$2"
                                        disabled
                                    />
                                    <span className="text-gray-500">/hr</span>
                                </div>
                            </div>

                            <div className="flex pb-4 justify-between gap-4 items-center">
                                <div>
                                    <h1 className="text-xl flex-1 font-serif">You'll Receive</h1>
                                    <p className="text-gray-500">
                                        This estimated amount you ll receive .
                                    </p>
                                </div>
                                <div className="mt-2 flex gap-0.5 items-center">
                                    <input
                                        id="estimatedamount"
                                        type="text"
                                        autoComplete=""
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="text-gray-500">/hr</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {fixed ? (<Card className="mt-6 py-3">

                <div className="px-6 space-y-4">
                    <h4 className="font-bold text-xl">How long will this project take?</h4>
                    <div className="w-[220px]">
                        <select className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Select an duration</option>
                            <option value="option1">More than 6 months</option>
                            <option value="option2">3 to 6 months</option>
                            <option value="option3">1 to 3 months</option>
                            <option value="option3">less than  a month</option>
                        </select>
                    </div>


                </div>



            </Card>) : (<></>)}

            <Card className="mt-6 py-3">
                <div className="px-6 pb-4">
                    <Label htmlFor="cover">Cover Letter</Label>
                    <Textarea placeholder="Type your message here." id="message" />


                </div>
                <h2 className="px-6">Attachments</h2>
                <div className="flex items-center justify-center w-full px-6">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                <CardFooter>
                    <small className="text-gray-600">You may attach up to 10 files under the size of 25 MB each. Include work samples or other documents to support your application. Do not attach your resume — your Upwork profile is automatically forwarded to the client with your proposal.</small>
                </CardFooter>
            </Card>
            <div className="flex px-6 py-4 gap-2"><Button variant="btn_green">Apply</Button>
                <Button variant="outline">Cancel</Button>
            </div>


        </MaxWidthWrapper>
    );
};

export default ProposalForm;
