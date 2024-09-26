'use client';
import { getAccount, getAccounts } from '@/actions/bank.actions';
import { getLoggedInUser } from '@/actions/bankUseractions';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const WalletPage = () => {

    // const accounts = await getAccounts({
    //     userId: loggedIn.$id
    // });
    const router = useRouter();
    const checkUser = async () => {
        const loggedIn = await getLoggedInUser();
        if (!!loggedIn) {
            router.push('/wallet/my-banks');
            return;
        }
        if (loggedIn === null) {
            router.push('/wallet/auth/sign-in');
        }
    }
    useEffect(() => {
        checkUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <p>Loading...</p>
}

export default WalletPage