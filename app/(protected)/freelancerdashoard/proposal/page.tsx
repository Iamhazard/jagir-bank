'use client'
import React, { useEffect, useState } from 'react'
import MaxWidthWrapper from '../../_components/maxwidthWrappers'
import { Card } from '@/Components/ui/card'
import Link from 'next/link'
import axios from 'axios'
import { format } from 'date-fns'

export interface Proposalprops {
    coverLetter: string;
    duration: string;
    estimatedAmount: string;
    hourlyRate: string;
    id: string;
    image: string;
    createdAt: string;
    job: {
        clientProfileId: string;
        createdAt: string;
        duration: string;
        expertise: string;
        fixed: string;
        from: string;
        id: string;
        jobDescription: string;
        post: string;
        projectSize: string;
        status: string;
        to: string;
        updatedAt: string;
    };
    jobId: string;
    status: string;
    userId: string;
}

const Page = () => {
    const [proposals, setProposals] = useState<Proposalprops[]>([]);

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

    return (
        <>
            <h1 className='text-xl my-2 px-4 mx-auto text-Green font-semibold'>My Proposal</h1>
            <MaxWidthWrapper className='my-6'>
                <h1 className="tex-2xl font-bold text-gray-700 px-2 py-2" id='contact'>Active proposal</h1>
                <Card>
                    <h1 className='py-2 px-2 text-xl font-semibold '>Offers (0)</h1>
                </Card>
                <Card className='mt-3'>
                    <h1 className='py-2 px-2 text-xl font-semibold '>Invitations to interview (0)</h1>
                </Card>
                <Card className='mt-3'>
                    <h1 className='py-2 px-2 text-xl font-semibold '>Active proposals  (0)</h1>
                </Card>
                <Card className='mt-3'>
                    <h1 className='py-2 px-2 text-xl font-semibold '>Submitted proposals  ({proposals.length})</h1>
                    {proposals.map((proposal, index) => (
                        <div key={index} className='flex  flex-col sm:flex-row justify-between items-center pt-5  py-3'>
                            <div>
                                <small className='block sm:inline-block px-2'>
                                    Initiated {format(new Date(proposal.createdAt), "MMM d, yyyy")}
                                </small>
                            </div>
                            <Link href={`/freelancerdashoard/proposal/${proposal.id}`} className=''>
                                <h1 className="text-xl sm:text-2xl font-medium inline-block border-b border-transparent hover:border-green-500 text-gray-700 hover:text-Green">
                                    {proposal.job?.post}
                                </h1>
                            </Link>
                            <small className='px-2 text-gray-600'>Frontend Devs</small>
                        </div>
                    ))}
                </Card>
            </MaxWidthWrapper>
        </>
    );
}

export default Page;
