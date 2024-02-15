"use client"
import { Card, CardFooter, CardHeader } from '@/Components/ui/card'
import { Separator } from '@/Components/ui/separator'
import React from 'react'
import ClientDialog from './clientDIalog'
import { Button } from '@/Components/ui/button'
import { cn } from '@/lib/utils'

const ClientjobsCards = () => {
    return (
        <Card className='py-4 px-5 '>

            <div className=' flex justify-between px-3 py-4'>
                <h1 className='py-2'>Posts Name</h1>
                <ClientDialog type='Post Name' />
            </div>
            <Separator />
            <div className=' flex justify-between px-3 py-4'>
                <h1 className='py-2'>Posts Description</h1>
                <ClientDialog type='Posts Description' />
            </div>
            <Separator />
            <div className=' flex justify-between px-3 py-1'>
                <h1 className='py-2 text-xl'>Category</h1>

                <ClientDialog type='Category' />

            </div>
            <p className='px-3 text-gray-600'>hi</p>
            <div className=' flex justify-between px-3 py-1'>
                <h1 className='py-2 text-xl'>Skils</h1>

                <ClientDialog type='Skills' />

            </div>
            <p className='px-3 text-gray-600'>hi</p>
            <div className=' flex justify-between px-3 py-1'>
                <h1 className='py-2 text-xl'>Scope</h1>

                <ClientDialog type='Scope' />

            </div>
            <p className='px-3 text-gray-600'>hi</p>
            <div className=' flex justify-between px-3 py-1'>
                <h1 className='py-2 text-xl'>Budget</h1>

                <ClientDialog type='Budget' />

            </div>
            <p className='px-3 text-gray-600'>hi</p>
            <Separator />
            <CardFooter className={cn("flex justify-between py-3")}>


                <Button variant='outline'>Back</Button>
                <Button variant='btn_green'>Post this Jobs</Button>


            </CardFooter>
        </Card>
    )
}

export default ClientjobsCards