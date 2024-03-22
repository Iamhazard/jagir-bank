/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-unescaped-entities */
'use client'
import { ProposalForms } from '@/@types/enum'
import { Badge } from '@/Components/ui/badge'
import { Card } from '@/Components/ui/card'
import { Separator } from '@/Components/ui/separator'
import MaxWidthWrapper from '@/app/(protected)/_components/maxwidthWrappers'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Proposalprops } from '../page'
import Link from 'next/link'
import { Button } from '@/Components/ui/button'
import DeleteModal from '@/app/(protected)/_components/DeleteModal'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface IParams {
    jobId?: string;
}
const ProposalDetails = ({ params }: { params: IParams }) => {
    const jobId = params.jobId;
    //console.log({ jobId })
    const [isLoading, setIsLoading] = useState(false);
    const [proposals, setProposals] = useState<Proposalprops[]>([]);
    const router = useRouter();
    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await axios.get('/api/job/jobapply');
                const data = response.data;
                setProposals(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProposals();
    }, []);
    // console.log(proposals)

    const onclick = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/job/proposal/${jobId}`)
            .then(() => {
                router.push('/');
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
    }, [jobId, router]);

    return (
        <MaxWidthWrapper>
            <Card className="py-3  mt-6">
                {proposals
                    && proposals.map((proposal, index) => (
                        <div key={index} className="px-6 space-y-4">
                            <h1 className="font-bold text-xl sm:text-2xl">Job Details</h1>
                            <div className="flex flex-col sm:flex-row">
                                <div className="flex-1 space-y-2 sm:mr-4">
                                    <h2>{proposal.job.post}</h2>
                                    <small className="px-4 line-clamp-4">{proposal.job.jobDescription}</small>
                                    <div className="flex gap-0.5">
                                        <Badge variant="success" className="p-2">
                                            Front-End Development
                                        </Badge>
                                        <Badge variant="success" className="p-2">
                                            Next.js
                                        </Badge>
                                    </div>
                                    <p className="py-4">{/* Additional details */}</p>
                                </div>
                                <div className="sm:hidden">
                                    <Separator orientation="vertical" />
                                </div>
                                <div className="w-full sm:w-[400px] px-6 mt-4 sm:mt-0">
                                    <h1 className="mr-6">{proposal.job.expertise}</h1>
                                    <h1>{`Hourly: $${proposal.job.from}-$${proposal.job.to} - Fixed: $${proposal.job.fixed}`}</h1>
                                    <h1>{proposal.job.duration}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                <h1 className='px-6 font-mono text-gray-900 hover:text-Green border-b border-transparent hover:border-green-500'>
                    <Link href={`/jobs/bestmatches/${jobId}`}>View Job Posting</Link>
                </h1>
                <Separator />
                {proposals && (
                    <>
                        <h1 className="py-2 px-3 font-bold text-2xl">Your Proposed terms</h1>
                        {proposals.map((proposal, index) => (
                            <div key={index}>
                                <div className='py-2 px-3'>
                                    <h1 className='font-medium'>Profile</h1>

                                </div>
                                <Separator />
                                <div className='py-2 px-3'>
                                    <h1 className='font-medium'>Hourly rate</h1>
                                    <small className='text-gray-600'>Total amount the client will see on your proposal</small>
                                    <p>{proposal.hourlyRate}</p>
                                </div>
                                <Separator />
                                <div className='py-2 px-3'>
                                    <h1 className='font-medium'>You'll receive</h1>
                                    <small className='text-gray-600'>The estimated amount you'll receive after service fees</small>
                                    <p>${proposal.estimatedAmount}</p>
                                </div>
                                <Separator />
                                <div className='py-2 px-3'>
                                    <h1 className='font-medium'>Rate increase</h1>
                                    <small className='text-gray-600'>Rate-increase term the client will see on your proposal</small>
                                    <p>No</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}



                <div className='flex px-3 py-3 gap-4 space-x-2'><Button variant='btn_green'>Change terms</Button>
                    <DeleteModal onclick={onclick} isOpen={false} />
                </div>
            </Card>
            <Card className='py-2'>
                <h1 className='px-3 font-bold text-2xl'>Cover Letter</h1>
                {proposals && (
                    proposals.map((proposal, index) => (
                        <p key={index} className='px-3'>
                            {proposal.coverLetter}
                        </p>
                    ))
                )}
            </Card>

            <Card className='py-2 pb-3'>
                <h1 className='px-3 font-bold text-2xl'>About client</h1>
                <h1 className='px-3'>
                    Location
                </h1>

            </Card>

        </MaxWidthWrapper>
    )
}

export default ProposalDetails