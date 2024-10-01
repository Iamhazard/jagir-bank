'use client';

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Textarea } from '@/Components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { StarIcon } from 'lucide-react';

type Proposal = {
    id: string;
    status: string;
    userId: string;
    job?: {
        post: string;
    };
};

type Contract = {
    id: string;
    userId: string;
    jobId: string;
    status: string;
    proposalId: string;
};

const Status = () => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [review, setReview] = useState<string>('');
    const [rating, setRating] = useState<number | null>(null);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const response = await axios.get('/api/job/jobapply');
                setProposals(response.data);
            } catch (error) {
                console.error('Error fetching proposals:', error);
            }
        };

        fetchProposals();
    }, []);

    const acceptedProposals = useMemo(
        () => proposals.filter((proposal) => proposal.status === 'ACCEPTED'),
        [proposals]
    );

    const proposalIds = useMemo(() => acceptedProposals.map((proposal) => proposal.id), [acceptedProposals]);
    // const userId = useMemo(() => contracts.map((cat) => cat.userId), [contracts]);
    // const jobId = useMemo(() => contracts.map((cat) => cat.jobId), [contracts]);

    const userId = useMemo(() => {
        return contracts.length > 0 ? contracts[0].userId : null;
    }, [contracts]);

    const jobId = useMemo(() => {
        return contracts.length > 0 ? contracts[0].jobId : null;
    }, [contracts]);
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

    const handleReviewSubmit = async (contractId: string) => {
        if (rating === null) {
            alert("Please select a rating before submitting.");
            return;
        }
        try {
            await axios.post('/api/job/review', {
                contractId,
                status: 'COMPLETED',
                review,
                userId: userId,
                jobId: jobId,
                rating
            });
            alert('Review submitted successfully!');
            setReview('');
            setRating(null);
        } catch (error) {
            console.error('Error updating contract Review:', error);
        }
    }

    console.log(review)
    console.log(proposals)
    const handleCompleteProposal = async (contractId: string) => {
        try {
            await axios.patch('/api/job/contract/updateStatus', {
                contractId,
                status: 'COMPLETED',
                proposalId: proposalIds
            });

            // await axios.delete(`/api/job/contract/delete/${contractId}`);

            // setContracts((prev) => prev.filter((contract) => contract.id !== contractId));
            // setProposals((prev) =>
            //     prev.map((proposal) =>
            //         proposal.id === proposalId ? { ...proposal, status: 'COMPLETED' } : proposal
            //     )
            // );

            alert('Proposal marked as completed and contract deleted.');
        } catch (error) {
            console.error('Error completing proposal:', error);
            alert('Failed to complete proposal.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800">Accepted Proposals</h1>
            {acceptedProposals.length > 0 ? (
                acceptedProposals.map((proposal) => {
                    const contract = contracts.find(c => c.proposalId === proposal.id);
                    return (
                        <Card key={proposal.id}>
                            <CardHeader>
                                <CardTitle>{proposal.job?.post}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">Client: {proposal.userId}</p>
                                <p className="text-gray-600">Status: {contract ? contract.status : 'No contract found'}</p>
                                {contract && (
                                    <div className="mt-4 space-y-4">
                                        <h3 className="text-lg font-medium">Review Client:</h3>
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <StarIcon
                                                    key={star}
                                                    className={`h-6 w-6 cursor-pointer ${rating && star <= rating ? 'fill-yellow-500 text-yellow-500' : 'fill-gray-300 text-gray-300'}`}
                                                    onClick={() => setRating(star)}
                                                />
                                            ))}
                                        </div>
                                        <Textarea
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            placeholder="Write your review here..."
                                            className="mt-2"
                                        />
                                        <div className='gap-3 flex space-x-5'>
                                            <Button
                                                onClick={() => handleReviewSubmit(contract.id)}
                                                className="bg-green-500 hover:bg-green-600"
                                            >
                                                Submit Review
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">Mark as Completed</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleCompleteProposal(contract.id)}>
                                                            Continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>

                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })
            ) : (
                <p>No accepted proposals found.</p>
            )}
        </div>
    );
}

export default Status