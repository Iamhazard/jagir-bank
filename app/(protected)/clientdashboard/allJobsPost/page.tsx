'use client'
import { JobSheetProps } from '@/Components/FreelancerWoks/jobsSheet'
import clsx from 'clsx'
import { differenceInHours, format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiMapPin } from 'react-icons/fi'
import { MdOutlineCircle } from 'react-icons/md'
import MaxWidthWrapper from '../../_components/maxwidthWrappers'
import axios from 'axios'

const AllPost = () => {
    const [clientData, setClientData] = useState<JobSheetProps>()
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [getJobs, setJobs] = useState<JobSheetProps[]>([]);
    const clientId = clientData?.clientProfileId
    console.log(clientId)
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`/api/job/client/${clientData?.clientProfileId}`);
                const data = response.data;
                setJobs(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchJobs();
    }, [clientData?.clientProfileId, clientId, userId]);

    useEffect(() => {
        const clientdata = async () => {
            try {
                const response = await fetch(`/api/profile/clientProfile/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setClientData(data)
            } catch (error) {
                console.log(error)
            }
        }
        clientdata()


    }, [userId])
    console.log({ getJobs })


    return (
        <MaxWidthWrapper>
            <h1 className='text-2xl font-mono text-Green py-2 px-2'>All job post</h1>
            <div className='py-2'>

                {Array.isArray(clientData) && clientData.length > 0 ? (
                    clientData.map((client, index) => (
                        <div
                            key={index}
                            className={`max-w-[950px] max-h-[500px]   p-6 bg-[#ffffff] hover:bg-[#F2F7F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  "expanded" : ""
                        }`}>
                            <small className="text-gray-400 ">Posted {""}
                                Posted {format(new Date(client.createdAt), 'MMM dd, yyyy')}
                            </small>
                            <Link href={`/clientdashboard/allJobsPost/${client.id}`}>
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    {client.post}

                                </h5>
                            </Link>
                            <small className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                {/* {jobsbudget || " Price fixed-Intermediate-Est.Budget:$10k"} */}

                                {`Hourly:$${client.from}-$${client.to}-Fixed:$${client.fixed}-${client.expertise} `}

                            </small>
                            <div className="py-4">
                                <p
                                    className={clsx(
                                        "text-justify text-clip overflow-hidden",
                                        "line-clamp-4"
                                    )}>
                                    {client.jobDescription}
                                </p>
                            </div>
                            <p
                                className="text-blue-500 cursor-pointer"
                            >
                            </p>
                            <div className="flex gap-4 mt-4">
                                {clientData.map((skill, i) => (
                                    <button
                                        key={i}
                                        className="bg-gray-400 max-h-10 rounded-3xl border-[1px] p-2 items-center">
                                        {skill.title}

                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-6">
                                <span className="flex gap-2">
                                    <MdOutlineCircle size={18} color="green" />
                                    <small className="text-gray-600">Payment verified</small>
                                </span>
                                <p>$2k + spent</p>

                                <span className="flex gap-2">
                                    <FiMapPin /> {client.Place}
                                </span>
                            </div>
                            <div className="flex flex-1 mt-4 gap-4">
                                { }
                                <p>Proposals: 50+</p>
                                <p>Connects to apply: 12 Connects</p>
                            </div>
                        </div>
                    )
                    )) : (
                    <>
                    </>
                )}


            </div>
        </MaxWidthWrapper>
    )
}

export default AllPost