'use client'
import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import Link from 'next/link'
import React from 'react'
import { Card } from '@/Components/ui/card'
import { cn } from '@/lib/utils'
import PlaidLink from '@/Components/wallet/PlaidLink'
import getCurrentUser from '@/actions/getCurrentUser'

const FreeLancerCard = () => {
    const loggedIn = getCurrentUser();
    return (
        <>
            <div className="py-10 px-6 flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-4xl font-medium mb-4 sm:mb-0">Your workspace</h1>
                <div className="flex gap-3">
                    <Link href="/freelancerdashoard/allPost">
                        <Button variant='link' className="text-Green">My Reports</Button>
                    </Link>
                    <Separator orientation="vertical" />
                    <Link href='/freelancerdashoard/reports'>
                        <Button variant="link" className="text-Green">My Status</Button>
                    </Link>
                    <Separator orientation="vertical" />
                    <Link href='/freelancerdashoard/proposal'>
                        <Button variant="link" className="text-Green">My Proposal</Button>
                    </Link>
                </div>
                <Button variant='btn_green' className="mt-4 sm:mt-0">Find a job</Button>
            </div>

            <Card className="border-t border-slate-400 bg-emerald-200 px-6 py-2 mx-auto">

                <h1 className='text-2xl font-medium pb-3'>
                    My Jobs
                </h1>
                <p>Earnings available now:
                    $0.00
                </p>
                <div className="flex flex-col gap-4 max-w-[200px] py-2">
                    <PlaidLink user={loggedIn} variant="primary" />
                </div>

            </Card>
            <div className="px-6 py-5">
                <h2 className="text-2xl font-medium pb-3">Active contracts</h2>
                <div className="flex gap-4 space-x-5 justify-center items-center ">
                    <Card className={cn("w-[550px] py-3 justify-center items-center bg-emerald-100")}>

                        <div className='px-4 gap-4 space-y-4 items-center'>
                            <h1>There are no active contracts.</h1>
                            <p>Contracts you’re actively working on will appear here.</p>
                            <Button variant="outline" >Search  for  new jobs</Button>
                        </div>
                    </Card>

                </div>

            </div>

        </>
    )
}

export default FreeLancerCard