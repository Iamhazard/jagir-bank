import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import { Edit2Icon } from 'lucide-react'
import React from 'react'

const ClientJobsPosts = () => {
    return (
        <div>
            <div className="flex w-[500px] items-center justify-center">
                <form>

                    <div className=" relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="inline-flex w-[400px] p-2.5 ps-10 rounded-full text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                            required
                        />
                        <Button className=" absolute end-2.5 bottom-1" variant='outline' size='sm'>Search</Button>

                    </div>
                </form>

            </div>
            <Separator />
            <div className='flex justify-between'>
                <div>
                    <h1>web</h1>
                </div>
                <div className='flex'>
                    <Button> Edit Draft</Button>

                </div>
            </div>
        </div>
    )
}

export default ClientJobsPosts