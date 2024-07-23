import { SearchParamProps } from '@/@types';
import getCurrentUser from '@/actions/getCurrentUser';
import HeaderBox from '@/Components/wallet/HeaderBox'
import RightSidebar from '@/Components/wallet/RightSideBar';
import TotalBalanceBox from '@/Components/wallet/TotalBalanceBox';
import React from 'react'

const HomeLayout = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getCurrentUser();
    // const accounts = await getAccounts({
    //     userId: loggedIn.$id
    // })

    // if (!accounts) return;

    // const accountsData = accounts?.data;
    // const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    // const account = await getAccount({ appwriteItemId })
    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.name || 'Guest'}
                        subtext="Access and manage your account and transactions efficiently."
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={2000}
                    />

                </header>

            </div>
            <RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 123.50 }, { currentBalance: 123.50 }]}
            />
        </section>
    )
}

export default HomeLayout