'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';


const AnimatedCounter = ({ amount }: { amount: number }) => {
    const [earnings, setEarnings] = useState(0.00);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session } = useSession()
    const userId = session?.user.id
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchEarnings() {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/job/contract/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch earnings');
                }
                const data = await response.json();
                setEarnings(data.totalEarnings);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchEarnings();
    }, [userId]);
    return (
        <div className="w-full">
            <CountUp
                decimals={2}
                decimal=","
                prefix="Nrs"
                end={earnings}
            />
        </div>
    )
}

export default AnimatedCounter