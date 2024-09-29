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


interface Job {
    user?: User
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
    proposals?: ProposalProps[]
}

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
    user: User;
}
export interface ContractProps {
    createdAt: string;
    id: string;
    status: string;
    post: string;
    country: string;
    userId: string;
    updatedAt: string;
    jobId: string;
    proposals?: ProposalProps[];
    job: Job;
}
interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
}




const AllContracts = () => {
    const [contracts, setContracts] = useState<ContractProps[]>([]);
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userId = session?.user.id
    useEffect(() => {
        if (!userId) return;

        setIsLoading(true);
        setError(null);
        const clientdata = async () => {
            try {
                const response = await fetch(`/api/profile/clientProfile/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data: ContractProps[] = await response.json();
                setContracts(data)


            }
            catch (error) {
                console.log(error)
            }
        }
        clientdata()


    }, [userId])

    // if (isLoading) {
    //     return <div className="text-center py-10">Loading...</div>;
    // }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    console.log("from client dashboard", contracts)

    const proposalDetails = contracts.flatMap((job) =>
        job?.proposals?.map((proposal) => ({
            proposalId: proposal.id,
            post: job.post,
            userName: proposal.user.name,
            userEmail: proposal.user.email,
            hourlyRate: proposal.hourlyRate,
            status: proposal.status,
            createdAt: proposal.createdAt,
            userId: proposal.userId,
            jobId: proposal.id,
        }))
    );


    console.log(proposalDetails);
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
                    <h1 className='py-2 px-2 text-xl font-semibold '>Offers Received  ({contracts.reduce((acc, contract) => acc + (contract.proposals?.length || 0), 0)})</h1>

                    <>
                        {proposalDetails?.map((detail, index) => (

                            <div key={`${index}`} className='flex  flex-col sm:flex-row justify-between items-center pt-5  py-3'>
                                <div>
                                    <small className='block sm:inline-block px-2'>
                                        Initiated: {detail?.createdAt ? format(new Date(detail?.createdAt), "MMM d, yyyy") : 'N/A'}
                                    </small>
                                </div>
                                <div className='flex-col'>
                                    <div>
                                        <Link href={`/jobs/bestmatches`} className=''>
                                            <h1 className=" sm:text-2xl font-medium inline-block border-b border-transparent hover:border-green-500 text-gray-700 hover:text-Green">
                                                {detail?.post}
                                            </h1>
                                        </Link>
                                    </div>
                                    <div>

                                        <small className='block sm:inline-block px-2'>
                                            Job Id: {detail?.jobId}
                                        </small>
                                        <small className='px-2 text-gray-600'>Applied name:{`${detail?.userName}`}</small>
                                    </div>

                                </div>
                                <div className='flex gap-2' >
                                    <Link href={`/clientdashboard/allContract/contract/${detail?.proposalId}`}>
                                        <Button variant='outline' size='sm' className='text-gray-600 '>Creat contract</Button></Link>


                                </div>



                            </div>
                        ))

                        }
                    </>




                </Card>
            </MaxWidthWrapper>
        </>
    )
}

export default AllContracts