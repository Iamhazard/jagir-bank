'use client'

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Skeleton } from '@/Components/ui/skeleton';

type Contract = {
    id: string;
    status: string;
    userId: string;
    proposalId: string;
    Amount: string;
    servicesFee: number;
    jobId: string;
    Deadlines: string;
    createdAt: string;
    updatedAt: string;
};

interface IParams {
    proposalId?: string;
}

const ProposalPage = ({ params }: { params: IParams }) => {
    const [loading, setLoading] = useState(true);
    const [contract, setContract] = useState<Contract | null>(null);
    const { proposalId } = params;

    useEffect(() => {
        const fetchContract = async () => {
            if (proposalId) {
                try {
                    const response = await axios.get(`/api/job/contract/getContract/${proposalId}`);
                    setContract(Array.isArray(response.data) ? response.data[0] : response.data);
                } catch (error) {
                    console.error('Error fetching contract:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchContract();
    }, [proposalId]);

    const isActive = useMemo(() => contract?.status === 'ACTIVE', [contract]);

    if (loading) {
        return <Skeleton className="w-full h-48" />;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
                {isActive ? (
                    <>
                        <h2 className="text-xl font-semibold mb-2">Contract ID: {contract?.id}</h2>
                        <p className="mb-2">Status: {contract?.status}</p>
                        <p className="mb-2">Amount: {contract?.Amount}</p>
                        <Link href={`/freelancerdashoard/proposal/${contract?.proposalId}`} className="text-blue-500 hover:underline">
                            View Proposal
                        </Link>
                    </>
                ) : (
                    <p>No active contract found.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default ProposalPage;