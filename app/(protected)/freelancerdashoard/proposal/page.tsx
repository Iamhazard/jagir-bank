'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MaxWidthWrapper from '../../_components/maxwidthWrappers'
import { Card } from '@/Components/ui/card'
import Link from 'next/link'
import axios from 'axios'
import { format } from 'date-fns'
import { Button } from '@/Components/ui/button'

export interface Proposalprops {
    coverLetter: string;
    duration: string;
    estimatedAmount: string;
    hourlyRate: string;
    interviewLink: string;
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
        Category: {
            id: string;
            title: string;
            createdAt: string;
            updatedAt: string;
        };
    };

    jobId: string;
    status: string;
    userId: string;
}
export interface Contract {
    id: string;
    proposalId: string;
    userId: string;
    jobId: string;
    Amount: string;
    servicesFee: number;
    Deadlines: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}


const Page = () => {
    const [proposals, setProposals] = useState<Proposalprops[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);
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


    //console.log("Proposals:", proposals);

    const acceptedProposals = useMemo(
        () => proposals.filter((proposal) => proposal.status === 'ACCEPTED'),
        [proposals]
    );
    const interviewProposal = useMemo(
        () => proposals.filter((proposal) => proposal.interviewLink),
        [proposals]
    );

    const proposalIds = useMemo(() => acceptedProposals.map((proposal) => proposal.id), [acceptedProposals]);

    useEffect(() => {
        const fetchContracts = async () => {
            if (proposalIds.length > 0) {
                try {
                    const response = await axios.get(`/api/job/contract/getContract/${proposalIds}`);
                    const contractsData = Array.isArray(response.data) ? response.data : [response.data];

                    setContracts(contractsData);
                } catch (error) {
                    console.error('Error fetching contracts:', error);
                }
            }
        };

        if (proposalIds.length > 0) {
            fetchContracts();
        }
    }, [proposalIds]);

    const activeContracts = useMemo(() => {
        return contracts.filter((contract) => contract.status === 'ACTIVE');
    }, [contracts]);

    //console.log(activeContracts)

    const acceptContract = useCallback(async (contractId: string) => {
        try {
            await axios.patch(`/api/job/contract/updateStatus`, { contractId, status: 'ACCEPTED' })
            setContracts(prevContracts =>
                prevContracts.map(contract =>
                    contract.id === contractId ? { ...contract, status: 'ACCEPTED' } : contract
                )
            );


            alert(`Contract ${contractId} status updated to ACCEPTED.`);
        } catch (error) {
            console.error('Error updating contract status:', error);
            // Optionally handle error cases, e.g., show a notification
        }
    }, []);

    return (
        <>
            <h1 className='text-xl my-2 px-4 mx-auto text-Green font-semibold'>My Proposal</h1>
            <MaxWidthWrapper className='my-6'>
                <h1 className="tex-2xl font-bold text-gray-700 px-2 py-2" id='contact'>Active proposal</h1>
                <Card>
                    <h1 className='py-2 px-2 text-xl font-semibold '>Offers ({activeContracts.length})</h1>
                    {contracts.length > 0 ? (
                        contracts.map((contract) => (
                            <div key={contract.id} className="flex flex-col sm:flex-row justify-between items-center pt-5 py-3">
                                <div>
                                    <small className="block sm:inline-block px-2">
                                        Contract Initiated {format(new Date(contract.createdAt), 'MMM d, yyyy')}
                                    </small>
                                </div>
                                <Link href={`/freelancerdashoard/proposal/view/${contract.proposalId}`} className="">
                                    <h1 className="text-xl sm:text-2xl md:text-sm font-medium inline-block border-b border-transparent hover:border-green-500 text-gray-700 hover:text-Green">
                                        Contract for Proposal {contract.proposalId}
                                    </h1>
                                </Link>
                                <small className="px-2 text-gray-600">Amount: ${contract.Amount}</small>

                                <small className="px-2 text-gray-600">Deadline: {format(new Date(contract.Deadlines), 'MMM d, yyyy')}</small>
                                <>
                                    <Button onClick={() => acceptContract(contract.id)}>Accept Contract</Button>
                                </>
                            </div>

                        ))
                    ) : (
                        <p>No active offers found.</p>
                    )}
                </Card>
                <Card className='mt-3'>
                    <h1 className='py-2 px-2 text-xl font-semibold '>Invitations to interview ({interviewProposal.length})</h1>
                    {acceptedProposals.length > 0 ? (
                        interviewProposal.map((proposal) => (
                            <div key={proposal.id} className='flex flex-col sm:flex-row justify-between items-center pt-5 py-3'>
                                <div>
                                    <small className='block sm:inline-block px-2'>
                                        Initiated {format(new Date(proposal.createdAt), "MMM d, yyyy")}
                                    </small>
                                </div>
                                <Link href={`/freelancerdashoard/proposal/${proposal.id}`} className=''>
                                    <h1 className="text-xl sm:text-2xl md:text-sm font-medium inline-block border-b border-transparent hover:border-green-500 text-gray-700 hover:text-Green">
                                        {proposal.job?.post}
                                    </h1>
                                </Link>
                                <small className='px-2 text-gray-600'>{proposal.job?.Category.title}</small>
                                <div className='md:size-min'>
                                    {proposal.interviewLink ? (
                                        <Link className='text-gray-900 hover:underline hover:text-blue-700' href={proposal.interviewLink}>
                                            Interview
                                        </Link>
                                    ) : (
                                        <span className='hover:underline hover:text-rose-500'>Waiting..</span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No active proposals found.</p>
                    )}
                </Card>
                <Card className='mt-3'>

                    <h1 className='py-2 px-2 text-xl font-semibold '>Active proposals  ({acceptedProposals.length})</h1>

                    {acceptedProposals.length > 0 ? (
                        acceptedProposals.map((proposal) => (
                            <div key={proposal.id} className='flex flex-col sm:flex-row justify-between items-center pt-5 py-3'>
                                <div>
                                    <small className='block sm:inline-block px-2'>
                                        Initiated {format(new Date(proposal.createdAt), "MMM d, yyyy")}
                                    </small>
                                </div>
                                <Link href={`/freelancerdashoard/proposal/${proposal.id}`} className=''>
                                    <h1 className="text-xl sm:text-2xl md:text-sm font-medium inline-block border-b border-transparent hover:border-green-500 text-gray-700 hover:text-Green">
                                        {proposal.job?.post}
                                    </h1>
                                </Link>
                                <small className='px-2 text-gray-600'>{proposal.job?.Category.title}</small>

                            </div>
                        ))
                    ) : (
                        <p>No active proposals found.</p>
                    )}


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
                                <h1 className="text-xl sm:text-2xl md:text-sm font-medium inline-block border-b border-transparent hover:border-green-500 text-gray-700 hover:text-Green">
                                    {proposal.job?.post}
                                </h1>
                            </Link>
                            <small className='px-2 text-gray-600'>{proposal.job?.Category.title}</small>
                            <div className='md:size-min'>
                                {proposal.interviewLink ? (
                                    <Link className='text-gray-900 hover:underline hover:text-blue-700' href={proposal.interviewLink}>
                                        Interview
                                    </Link>
                                ) : (
                                    <span className='hover:underline hover:text-rose-500'>Waiting..</span>
                                )}
                            </div>

                        </div>
                    ))}
                </Card>
            </MaxWidthWrapper>
        </>
    );
}

export default Page;
