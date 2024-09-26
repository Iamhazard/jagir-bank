/* eslint-disable @next/next/no-img-element */
'use client'
import MaxWidthWrapper from '@/app/(protected)/_components/maxwidthWrappers'
import { JobSheetProps } from '@/Components/FreelancerWoks/jobsSheet'
import { Button } from '@/Components/ui/button'
import clsx from 'clsx'
import { differenceInHours, format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiMapPin } from 'react-icons/fi'
import { MdOutlineCircle } from 'react-icons/md'

interface JobsDetailsProps {
    params: {
        jobId: string;
    }
}

const JobsDetails = ({ params }: JobsDetailsProps) => {
    const [jobs, setJobs] = useState<JobSheetProps>()
    const { data: session } = useSession();
    const router = useRouter();
    const [interviewLoading, setInterviewLoading] = useState(false);
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [interviewLink, setInterviewLink] = useState("");

    const jobId = params?.jobId
    const proposalId = jobs?.proposals?.[0]?.id;
    console.log(proposalId)
    const userId = session?.user?.id;

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`/api/job/getjob/${jobId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setJobs(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchJobDetails()


    }, [jobId])

    console.log({ jobs })
    const client = jobs;

    const handleInterviewAndInvite = async (proposalId: string) => {
        setInterviewLoading(true);

        try {
            if (!interviewLink) {
                alert('Please provide a valid interview link.');
                setInterviewLoading(false);
                return;
            }

            const res = await fetch(`/api/job/jobapply/interview/${proposalId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    interviewLink: interviewLink,
                    status: 'INTERVIEW',
                }),
            });

            if (res.ok) {
                const updatedProposal = await res.json();
                console.log('Proposal status updated:', updatedProposal);
                router.push(`/conversations/${updatedProposal.userId}`);
            } else {
                console.error('Failed to update proposal status');
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setInterviewLoading(false);
        }
    };
    const handleAcceptAndInvite = async (proposalId: string) => {
        setAcceptLoading(true);

        try {
            const res = await fetch(`/api/job/jobapply/interview/${proposalId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'ACCEPTED',
                }),
            });

            if (res.ok) {
                const updatedProposal = await res.json();
                console.log('Proposal status updated:', updatedProposal);
                router.push(`/conversations/${updatedProposal.userId}`);
            } else {
                console.error('Failed to update proposal status');
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setAcceptLoading(false);
        }
    };


    return (
        <MaxWidthWrapper>
            <h1 className='text-2xl font-mono text-Green py-2 px-2'>All job post</h1>
            <div className='py-2'>

                {!!client && (
                    <div

                        className={`max-w-[950px] max-h-[500px]   p-6 bg-[#ffffff] hover:bg-[#F2F7F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  "expanded" : ""
                        }`}>
                        <small className="text-gray-400 ">Posted {""}
                            Posted {format(new Date(client.createdAt), 'MMM dd, yyyy')}
                        </small>
                        <Link href={`/clientdashboard/allJobsPost/${userId}`}>
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


                        <div className="flex flex-1 mt-4 gap-4">
                            <h1>Proposal</h1>
                            {client.proposals.map((proposal) => (
                                <div key={proposal.id} className="proposal-card">
                                    <div className="proposal-details">
                                        <p>Duration: {proposal.duration}</p>
                                        <p>Hourly Rate: ${proposal.hourlyRate}</p>
                                        <p>Estimated Amount: ${proposal.estimatedAmount}</p>
                                        <p>Status: {proposal.status}</p>
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor={`interview-link-${proposal.id}`}>Interview Link:</label>
                                        <input
                                            type="text"
                                            id={`interview-link-${proposal.id}`}
                                            value={interviewLink}
                                            onChange={(e) => setInterviewLink(e.target.value)}
                                            placeholder="Enter interview link"
                                            className="border p-2 rounded mt-1 w-full"
                                        />
                                    </div>

                                    <div className='flex items-center justify-center gap-2'>
                                        <Button
                                            onClick={() => {
                                                handleInterviewAndInvite(proposal.id).catch((error) => console.error(error));
                                            }}
                                            disabled={interviewLoading}
                                        >
                                            {interviewLoading ? "Sending..." : "Interview"}
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                handleAcceptAndInvite(proposal.id).catch((error) => console.error(error));
                                            }}
                                            disabled={acceptLoading}
                                        >
                                            {acceptLoading ? "Contract..." : "Accept"}
                                        </Button>
                                    </div>



                                </div>

                            ))

                            }

                        </div>
                    </div>
                )
                }


            </div>
        </MaxWidthWrapper>
    )
}

export default JobsDetails