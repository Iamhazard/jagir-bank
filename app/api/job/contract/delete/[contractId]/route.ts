

import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';


const deleteContract = async (req: NextApiRequest, res: NextApiResponse, { params }: { params: { contractId: string } }) => {
    if (req.method === 'DELETE') {
        const { contractId, proposalId } = req.body;

        try {
            // Delete the contract
            await db.contact.delete({
                where: {
                    id: contractId,
                },
            });

            // Update the proposal status
            await db.proposal.update({
                where: {
                    id: proposalId,
                },
                data: {
                    status: 'ACCEPTED',
                },
            });


            res.status(200).json({ message: 'Contract deleted and proposal marked as completed.' });
        } catch (error) {
            console.error('Error deleting contract:', error);
            res.status(500).json({ error: 'Failed to delete contract.' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default deleteContract;
