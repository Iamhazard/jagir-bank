/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState, useTransition } from 'react';
import { FormError } from '@/Components/auth/form-error';
import { FormSuccess } from '@/Components/auth/form-success';
import { Button } from '@/Components/ui/button';

import Breadcrumb from "@/app/admin/_component/Breadcrumbs/Breadcrumb";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CountrySchema, StateSchema } from "@/Schemas";
import { z } from "zod";
import { DistrictState } from '@/@types/enum';
import { Header } from '@/Components/auth/header';
import { DeleteButton } from '@/app/admin/_component/DeleteButton';
import { AppDispatch } from '@/Redux/store';
import { useDispatch } from 'react-redux';
import { viewCategories } from '@/Redux/Features/CategorySlice';
import Link from 'next/link';
import { Separator } from '@/Components/ui/separator';
import { cn } from '@/lib/utils';

export interface Countries {
    data: DistrictState[]
}

const DistrictPage = () => {
    const [error, setError] = useState<string | null>("");
    const [districtname, setDistrictName] = useState('');
    const [success, setSuccess] = useState<string | null>("");
    const [districts, setDistricts] = useState<Countries | null>(null)
    const [editDistrict, setEditDistrict] = useState<DistrictState | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, startTransition] = useTransition();
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState<Countries | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const form = useForm<z.infer<typeof CountrySchema>>({
        resolver: zodResolver(CountrySchema),
        defaultValues: {
            district: "",
        },
    })
    useEffect(() => {
        fetchCategories()

    }, [])

    const fetchCategories = async () => {
        try {
            dispatch(viewCategories()).then((res: any) => {
                if (res.payload) {
                    setCategories(res.payload);
                }
            });

        } catch (error) {
            console.log(error)

        }
    }


    function onSubmit(values: z.infer<typeof CountrySchema>) {

        console.log(values)
    }

    const resetForm = () => {
        form.reset({
            district: "",
        });
        setEditDistrict(null);
        setCategoryId('');
    };


    const handleCancelClick = () => {
        resetForm();
        setEditDistrict(null);
    };

    const handleDeleteClick = () => {

    }

    return (
        <>
            <Breadcrumb pageName="State" />

            {/* <!-- Normal Button Items --> */}
            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Add State Address
                    </h3>
                </div>

                <div className="p-4 md:p-6 xl:p-9">

                    <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {editDistrict ? "Update State" : "New State"}
                                                {editDistrict && (
                                                    <b>:{editDistrict.district}</b>
                                                )}

                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='pb-2 flex gap-2'>
                                    <Button
                                        disabled={isPending}
                                        type="submit"
                                        className='py-4'
                                        variant="default">
                                        {editDistrict ? 'Update' : 'Create'}
                                    </Button>
                                    <Button variant='destructive' type='submit' onClick={() => handleCancelClick}>Cancel</Button>
                                </div>
                            </form>
                        </Form>
                    </div>


                </div>
            </div>

            {/* <!-- Button With Icon Items --> */}
            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        List of State
                    </h3>
                </div>
                <div className='p-4 md:p-6 xl:p-9'>
                    <div className='mb-7.5 flex-wrap gap-5 xl:gap-20'>
                        <Header label='Existing State' />
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((c: DistrictState) => (

                                <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center justify-center ' key={c.id}>



                                    <Separator className='w-fit'>
                                        <Link href="/" className='inline-flex items-center justify-center px-16 py-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10'>
                                            {c.district}

                                        </Link>
                                    </Separator>


                                    <div className="flex gap-1">

                                        <Button type="button"
                                            onClick={() => {
                                                setEditDistrict(c)
                                                setDistrictName(c.district);
                                                setCategoryId(c.id)
                                            }}
                                        >
                                            Edit
                                        </Button>


                                        <DeleteButton label='Delete'
                                            onDelete={async () => handleDeleteClick()}
                                        >

                                        </DeleteButton>
                                    </div>

                                </div>
                            ))
                        ) : (<p className='px-4 '>No State Available</p>)}

                    </div>
                </div >
            </div >

        </>
    );
};

export default DistrictPage;
