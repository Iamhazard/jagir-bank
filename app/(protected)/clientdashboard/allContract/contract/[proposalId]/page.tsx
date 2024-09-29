/* eslint-disable react/no-unescaped-entities */
'use client'
import { Button } from '@/Components/ui/button';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

interface UserData {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: string;
}

interface ProposalData {
    id: string;
    duration: string;
    Coverletter: string | null;
    hourlyRate: string;
    estimatedAmount: string;
    serviceFee: number;
    image: string;
    interviewLink: string;
    status: string;
    jobId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    deadline?: string; // New field for deadline
    job: {
        id: string;
        post: string;
        projectSize: string;
        from: string;
        to: string;
        fixed: string;
        duration: string;
        jobDescription: string;
        clientProfile: {
            user: UserData;
        };
        proposals: Array<{
            user: UserData;
        }>;
    };
}

interface JobsDetailsProps {
    params: {
        proposalId: string;
    }
}

const ContractPage = ({ params }: JobsDetailsProps) => {
    const proposalId = params?.proposalId;
    const [proposal, setProposal] = useState<ProposalData | null>(null);
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userId = session?.user.id;

    useEffect(() => {
        if (!userId) return;

        setIsLoading(true);
        setError(null);
        const fetchProposalData = async () => {
            try {
                const response = await fetch(`/api/job/proposal/getproposal/${proposalId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch proposal data');
                }
                const data: ProposalData = await response.json();
                // For demonstration purposes, we're setting a mock deadline
                // In a real scenario, this should come from your API
                data.deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days from now
                setProposal(data);
            } catch (error) {
                console.error(error);
                setError('Failed to load proposal data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProposalData();
    }, [proposalId, userId]);

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!proposal) {
        return <div className="text-center py-10">No proposal data available</div>;
    }

    const clientName = `${proposal.job.clientProfile.user.name} ${proposal.job.clientProfile.user.lastName}`;
    const freelancerName = proposal.job.proposals[0]?.user ?
        `${proposal.job.proposals[0].user.name} ${proposal.job.proposals[0].user.lastName}` :
        'Unknown Freelancer';

    const handleSendContract = async () => {
        if (!proposal) return;

        try {
            const response = await fetch('/api/job/contract/getContract', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: proposal.job.proposals[0].user.id,
                    proposalId: proposal.id,
                    jobId: proposal.job.id,
                    Amount: proposal.estimatedAmount,
                    servicesFee: proposal.serviceFee,
                    deadlines: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send contract');
            }

            const result = await response.json();
            console.log('Contract sent successfully', result);
            alert('Contract sent successfully!');
        } catch (error) {
            console.error('Error sending contract:', error);
            alert('Failed to send contract');
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Contract Agreement</h1>

                <div className="mb-4">
                    <p className="text-gray-700">
                        This Contract is made between <strong>{clientName}</strong> (hereinafter referred to as "Client")
                        and <strong>{freelancerName}</strong> (hereinafter referred to as "Freelancer") on
                        <strong> {new Date(proposal.createdAt).toLocaleDateString()}</strong>.
                    </p>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">Scope of Work</h2>
                <p className="text-gray-700 mb-4">
                    The Freelancer agrees to provide the following services to the Client:
                    <br />
                    <strong>{proposal.job.post}</strong>
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Payment Terms</h2>
                <p className="text-gray-700 mb-4">
                    The Client agrees to pay the Freelancer <strong>${proposal.estimatedAmount}</strong> for the work specified above.
                    The payment will be made at an hourly rate of <strong>${proposal.hourlyRate}</strong>.
                    A service fee of <strong>${proposal.serviceFee}</strong> will be applied.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Duration and Deadline</h2>
                <p className="text-gray-700 mb-4">
                    The estimated duration of this contract is <strong>{proposal.duration}</strong>.
                    {proposal.deadline && (
                        <>
                            <br />
                            The deadline for completion of this project is set to: <strong>{new Date(proposal.deadline).toLocaleDateString()}</strong>.
                        </>
                    )}
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Job Description</h2>
                <p className="text-gray-700 mb-4">
                    {proposal.job.jobDescription}
                </p>



                <h2 className="text-xl font-semibold mt-6 mb-2">Status</h2>
                <p className="text-gray-700 mb-4">
                    Current status of the proposal: <strong>{proposal.status}</strong>
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Termination</h2>
                <p className="text-gray-700 mb-4">
                    Either party may terminate this contract by providing written notice.
                </p>

                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <p className="text-gray-700"><strong>Client Signature</strong></p>
                        <p className="text-gray-700 mt-2"><Button onClick={handleSendContract}>Send a contract to Freelancer</Button>
                        </p>
                        <p className="text-gray-700">{clientName}</p>
                    </div>

                </div>

                <div className="mt-10 text-center">
                    <p className="text-gray-500 text-sm">
                        By signing this contract, both parties agree to the terms and conditions outlined above.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContractPage;