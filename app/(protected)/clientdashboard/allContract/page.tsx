"use client"
import React, { useEffect, useState } from 'react'
import MaxWidthWrapper from '../../_components/maxwidthWrappers'
import { Card } from '@/Components/ui/card'
import { format } from 'date-fns'
import Link from 'next/link'
//import { Proposalprops } from '../../freelancerdashoard/proposal/page'
import axios from 'axios'
import { Button } from '@/Components/ui/button'
import { useSession } from 'next-auth/react'

interface ProposalProps {
    clientProfileId: string;
    coverLetter: string;
    duration: string;
    estimatedAmount: string;
    hourlyRate: string;
    id: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    userId: string;
}


export interface Contractprops {
    createdAt: string,
    id: any
    status: string,
    post: string,
    country: string,
    userId: string;
    updatedAt: string
    jobId: string,

    Proposals: ProposalProps[];
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

    }
}

const AllContracts = () => {
    const [getJobs, setJobs] = useState<Contractprops[]>([]);
    const [getproposals, setProposals] = useState<Contractprops[]>([]);
    const { data: session } = useSession()
    const userId = session?.user.id
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`/api/job/client/${userId}`);
                const data = response.data;
                setJobs(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchJobs();
    }, [userId]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`/api/job`);
                const data = response.data;
                setProposals(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchJobs();
    }, [userId]);


    // console.log("from client dashboard", getJobs)
    // console.log("from client dashboard client", getproposals)




    return (
        <>
            <h1 className='text-xl my-2 px-4 mx-auto text-Green font-semibold'>My Job Proposal</h1>
            <MaxWidthWrapper className='my-6'>

                <h1 className="tex-2xl font-bold text-gray-700 px-2 py-2" id='contact'>Active proposal</h1>

                <Card className='mt-3'>
                    <h1 className='py-2 px-2 text-xl font-semibold '>Invitations to interview (0)</h1>
                </Card>
                <Card className='mt-3'>
                    <h1 className='py-2 px-2 text-xl font-semibold '>Active proposals  (0)</h1>
                </Card>
                <Card className='mt-3'>
                    <h1 className='py-2 px-2 text-xl font-semibold '>Offers Received  ({getproposals?.length})</h1>

                    <>
                        {getproposals.map((proposal, index) => (
                            <div key={index} className='flex  flex-col sm:flex-row justify-between items-center pt-5  py-3'>
                                <div>

                                    <small className='block sm:inline-block px-2'>
                                        Initiated: {format(new Date(proposal.createdAt), "MMM d, yyyy")}
                                    </small>
                                </div>
                                <div className='flex-col'>
                                    <div>
                                        <Link href={`/jobs/bestmatches`} className=''>
                                            <h1 className=" sm:text-2xl font-medium inline-block border-b border-transparent hover:border-green-500 text-gray-700 hover:text-Green">
                                                {proposal.post}
                                            </h1>
                                        </Link>
                                    </div>
                                    <div>

                                        <small className='block sm:inline-block px-2'>
                                            Job Id: {proposal.id}
                                        </small>
                                        <small className='px-2 text-gray-600'>UserId:{proposal.userId}</small>
                                    </div>

                                </div>
                                <div className='flex gap-2' >
                                    <Link href={`/conversations/${proposal.userId}`}>
                                        <Button variant='outline' size='sm' className='text-gray-600 '>View Jobs</Button></Link>


                                </div>



                            </div>
                        ))}
                    </>




                </Card>
            </MaxWidthWrapper>
        </>
    )
}

export default AllContracts