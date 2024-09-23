import { SearchParamProps } from '@/@types';
import { getAccount, getAccounts } from '@/actions/bank.actions';
import { getLoggedInUser } from '@/actions/bankUseractions';
import HeaderBox from '@/Components/wallet/HeaderBox'
import PlaidLink from '@/Components/wallet/PlaidLink';
import RecentTransactions from '@/Components/wallet/RecentTransaction';
import RightSidebar from '@/Components/wallet/RightSideBar';
import TotalBalanceBox from '@/Components/wallet/TotalBalanceBox';
import React from 'react'

const HomeLayout = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();
    console.log(loggedIn)
    const accounts = await getAccounts({
        userId: loggedIn.$id
    })

    if (!accounts) return;

    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    const account = await getAccount({ appwriteItemId })
    return (
        <section className='no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll'>
            <div className='no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll'>
                <header className='flex flex-col justify-between gap-8'>
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={`${loggedIn?.firstName} ${loggedIn?.lastName}`}
                        subtext="Access and manage your account and transactions efficiently."
                    />
                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />

                </header>
                <RecentTransactions
                    accounts={accountsData}
                    transactions={account?.transactions}
                    appwriteItemId={appwriteItemId}
                    page={currentPage}
                />



            </div>
            <RightSidebar
                user={loggedIn}
                transactions={accounts?.transactions}
                banks={accountsData?.slice(0, 2)}
            />
        </section>
    )
}

export default HomeLayout