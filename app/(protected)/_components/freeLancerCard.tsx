import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import Link from 'next/link'
import React from 'react'
import { Card } from '@/Components/ui/card'
import { cn } from '@/lib/utils'

const FreeLancerCard = () => {
    return (
        <>
            <div className=" py-10 px-6 flex justify-between">
                <div className="flex">
                    <h1 className="text-4xl items-center font-medium ">Your workspace</h1>
                    <div className=" flex items-center px-4 gap-3">
                        <Link href="/clientdashboard/allPost">
                            <Button variant='link' className="text-Green">My Reports</Button>
                        </Link>

                        <Separator orientation="vertical" />
                        <Link href='/'>
                            <Button variant="link" className="text-Green">My Status</Button>
                        </Link>



                    </div>

                </div>
                <Button variant='btn_green'>find  a job</Button>
            </div>
            <section className="border-t border-slate-400 bg-emerald-200 px-6 py-2">

                <h1 className='text-2xl font-medium pb-3'>
                    My Jobs
                </h1>
                <p>Earnings available now:
                    $0.00
                </p>

            </section>
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