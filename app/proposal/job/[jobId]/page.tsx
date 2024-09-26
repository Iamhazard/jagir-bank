"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { ChangeEvent, useEffect, useState } from "react";
import MaxWidthWrapper from "@/app/(protected)/_components/maxwidthWrappers";
import { Card, CardFooter } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { ProposalForms } from "@/@types/enum";
import { CldUploadButton } from "next-cloudinary";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IParams {
    jobId?: string;
}
interface FormData {
    duration: string;
    coverLetter: string;
    estimatedAmount: 0;
    rate: string;
}

const ProposalForm = ({ params }: { params: IParams }) => {
    const fixed = 1;
    const [job, setJob] = useState<ProposalForms | null>(null);
    const routes = useRouter()
    const [loading, setLoading] = useState(true);
    const jobId = params.jobId;
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const watchHourlyRate = watch("hourlyRate", 0);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const servicesFee = 0.10;
    const { data: session } = useSession();
    const estimatedAmount = watchHourlyRate * (1 - servicesFee);
    //console.log(estimatedAmount)
    const calculatedFee = watchHourlyRate * servicesFee;
    useEffect(() => {
        if (!isNaN(calculatedFee)) {
            setValue("serviceFee", calculatedFee);
        } else {
            console.log("Invalid calculated fee:", calculatedFee);
        }
    }, [calculatedFee, setValue]);




    useEffect(() => {
        if (!jobId) {
            console.error("Job ID is null or undefined");
            return;
        }
        //console.log('Fetching job with ID:', jobId);
        try {
            const fetchJobs = async () => {
                try {
                    const response = await axios.get(`/api/job/getjob/${jobId}`)
                    const data = response.data

                    //console.log("response", response)
                    setJob(data);
                    setLoading(false);

                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            };

            fetchJobs();
        } catch (error) {
            console.log(error);
        }
    }, [jobId,])

    const handleUpload = (result: any) => {

        try {
            const imageUrl = result?.info?.secure_url;
            console.log({ imageUrl })

            if (imageUrl) {
                setImageUrl(imageUrl);
                // axios.post(`/api/job/jobapply/${jobId}`, {
                //     image: imageUrl,


                // })

            }
            else {
                console.error("Image URL is null or undefined");
            }

        } catch (error) {
            console.log(error)
        }

    };

    const onSubmit = (data: any) => {
        console.log(data.serviceFee?.toString(), "service fee data")

        const proposalData = {
            duration: data.duration,
            message: data.message,
            hourlyRate: data.hourlyRate,
            estimatedAmount: estimatedAmount?.toString() || '0',
            userId: session?.user.id,
            serviceFee: data.serviceFee?.toString() || '0',
            imageUrl: imageUrl,
            ...(data.jobId && { jobId: data.jobId }),
            clientProfileId: job?.clientProfileId
        }
        Object.keys(proposalData).forEach(key => proposalData[key] === undefined && delete proposalData[key]);


        console.log(proposalData, "data form proposal")
        // data.estimatedAmount = estimatedAmount.toFixed(2);
        // data.jobId = jobId;



        // if (imageUrl) {
        //     data.imageUrl = imageUrl;
        // }

        console.log("Data to be submitted:", data);

        try {
            const fetchJobs = async () => {
                try {
                    const response = await fetch(`/api/job/jobapply/${jobId}`, {
                        method: "POST",
                        headers: {
                        },
                        body: JSON.stringify(proposalData),
                    })

                    if (!response.ok) {
                        toast.success("Proposalsubmited")
                        throw new Error(`HTTP error! Status: ${response.status}`);

                    }

                    if (response.ok) {

                        toast.success("Job submitted successfully");
                        routes.push('/jobs/bestmatches')
                    }

                    console.log("response", { response })
                    setLoading(false);
                } catch (error) {
                    toast.error('Something went wrong! Please try again later.');
                    console.log(error);
                    setLoading(false);
                }
            };

            fetchJobs();
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <MaxWidthWrapper className={cn("gap-6 pb-10")}>
            <h1 className="py-4 px-6 text-3xl font-bold">Submit a new proposal</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    {job && (
                        <div className="px-6 space-y-4">
                            <h1 className="font-bold text-2xl">job details</h1>

                            <div className=" flex ">
                                <div className="flex-1 space-y-2">
                                    <h2>{job.post}</h2>
                                    <small className="px-4 line-clamp-4">
                                        {" "}
                                        {job.jobDescription}
                                    </small>
                                    <div className=" flex gap-0.5">
                                        <Badge variant="success" className="p-2 ">
                                            Front-End Development
                                        </Badge>
                                        <Badge variant="success" className="p-2 ">
                                            Next js
                                        </Badge>
                                    </div>

                                    <p className="py-4">{ }</p>
                                </div>

                                <div>
                                    <Separator orientation="vertical" />
                                </div>
                                <div className="w-[400px] px-6">
                                    <h1 className="mr-6">{job.expertise}</h1>

                                    <h1>
                                        {`Hourly:$${job.from}-$${job.to}-Fixed:$${job.fixed}`}{" "}
                                    </h1>
                                    <h1>{job.duration}</h1>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
                <Card className="mt-6 py-3">
                    <div className="px-6 space-y-4 sm:w-full md:w-[700px] lg:w-[900px] lg:ml-8">
                        <h1 className="font-bold text-2xl">Terms</h1>
                        {job && (
                            <div className="flex justify-between items-center">
                                <h2>What is the rate you'd like to bid for this job?</h2>
                                {fixed ? (
                                    <small>
                                        Client’s budget:
                                        {`Hourly:$${job.from}-$${job.to}-Fixed:$${job.fixed}`}
                                    </small>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )}

                        <small>Your profile rate: $7.00/hr</small>

                        <div className="sm:block">
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
                                        {...register("hourlyRate", { required: true })}
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
                                        id="serviceFee"
                                        aria-label="  readOnly input"
                                        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={`$${(calculatedFee ?? 0).toFixed(2)}`}
                                        readOnly
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
                                        readOnly
                                        value={`$${estimatedAmount.toFixed(2)}`}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="text-gray-500">/hr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="mt-6 py-3">
                    <div className="px-6 space-y-4">
                        <h4 className="font-bold text-xl">
                            How long will this project take?
                        </h4>
                        <div className="w-[220px] ">
                            <select
                                id="duration"
                                {...register("duration", { required: true })}
                                className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select an duration</option>
                                <option value="More than 6 months">More than 6 months</option>
                                <option value="3 to 6 months">3 to 6 months</option>
                                <option value="1 to 3 months">1 to 3 months</option>
                                <option value="less than a month">less than a month</option>
                            </select>
                        </div>
                    </div>
                </Card>

                <Card className="mt-6 py-3">
                    <div className="px-6 pb-4">
                        <Label htmlFor="cover">Cover Letter</Label>
                        <Textarea placeholder="Type your message here." id="message"
                            {...register("message", { required: true })}
                        />
                    </div>
                    <h2 className="px-6">Attachments</h2>
                    <div className="flex items-center justify-center w-full px-6">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag
                                    and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                            <CldUploadButton
                                options={{ maxFiles: 1 }}
                                onUpload={handleUpload}
                                uploadPreset="i1ziapfw"

                            >
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    multiple

                                />
                            </CldUploadButton>
                        </label>
                    </div>
                    <CardFooter>
                        <small className="text-gray-600">
                            You may attach up to 10 files under the size of 25 MB each.
                            Include work samples or other documents to support your
                            application. Do not attach your resume — your Upwork profile is
                            automatically forwarded to the client with your proposal.
                        </small>
                    </CardFooter>
                </Card>
                <div className="flex flex-col sm:flex-row  px-6 py-4 gap-2">
                    <Button variant="btn_green">Apply</Button>
                    <Button variant="outline" type="submit">
                        Cancel
                    </Button>
                </div>
            </form>
        </MaxWidthWrapper>
    );
};

export default ProposalForm;
