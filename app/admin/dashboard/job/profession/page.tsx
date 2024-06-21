/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import CardWrapper from '@/Components/auth/card-wrapper';
import { ProfessionSchema } from '@/Schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/Components/ui/input';
import { FormError } from '@/Components/auth/form-error';
import { FormSuccess } from '@/Components/auth/form-success';
import { Button } from '@/Components/ui/button';
import { CategoryState, ProfessionState } from '@/@types/enum';
import { Header } from '@/Components/auth/header';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/store';
import { editCategory, viewCategories } from '@/Redux/Features/admin/CategorySlice';
import { DeleteButton } from '@/app/admin/_component/DeleteButton';
import Select from 'react-select';
import { editProfessions, viewProfessions } from '@/Redux/Features/admin/professionSlice';

interface Profession {
    name: string,
}
interface OptionType {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    professions: string[];
}

interface Category {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    professions: string[];
}

const ProfessionPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const form = useForm<z.infer<typeof ProfessionSchema>>({
        defaultValues: {
            profession: "",
            categoryId: ""

        }
    })
    const [error, setError] = useState<string | null>("");
    const [professionName, setProfessionName] = useState('');
    const [success, setSuccess] = useState<string | null>("");
    const [categories, setCategories] = useState<Category[]>([])
    const [professions, setProfessions] = useState<Category | null>(null)
    const [editProfession, setEditProfession] = useState<ProfessionState | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, startTransition] = useTransition();
    const [professionId, setProfessionId] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);


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

    useEffect(() => {
        getprofession()

    }, [])

    const getprofession = async () => {
        try {
            dispatch(viewProfessions()).then((res: any) => {
                if (res.payload) {
                    setProfessions(res.payload);
                }
            });

        } catch (error) {
            console.log(error)

        }
    }
    console.log("all category from profession ", professions)

    const submitProfession = async (data: any) => {
        console.log(data)

        setSubmitting(true);

        if (editProfession) {
            await dispatch(editProfessions({
                professionId,
                profession: data.profession
            }))
            setSuccessMessage('Profession updated successfully');
            fetchCategories()
            resetForm();

        } else {
            try {
                const response = await fetch('/api/profession', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: JSON.stringify(data),
                })
                if (!response.ok) throw new Error("HTTP error " + response.status);
                //console.log(response)

                setSuccessMessage('Category added successfully');
                fetchCategories()
                resetForm();
            } catch (error) {
                setErrorMessage('Failed to add category');
                console.error('Error:', error);
            } finally {
                setSubmitting(false);
            }
        }

    };
    const resetForm = () => {
        form.reset({
            profession: "",
            categoryId: ""
        });
        setEditProfession(null);
        setProfessionId('');
    };

    const handleCancelClick = () => {
        resetForm();
        setEditProfession(null); // Clear the edit state
    };

    const handleDeleteClick = () => {

    }
    const selectOptions = categories.map(category => ({
        value: category.id,
        label: category.title
    }));

    return (

        <main className="flex mx-auto max-w-[800px] justify-center items-center">
            <CardWrapper
                headerLabel='Profession'
                blackButtonHref='/admin/dashboard'
                backButtonLabel='Back home'
            >
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitProfession)} className="space-y-6">
                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field: { onChange, value, ref } }) => (
                                        <FormItem>
                                            <label>Job Category</label>
                                            <FormControl>
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="category"
                                                    isDisabled={isDisabled}
                                                    isLoading={isLoading}
                                                    isClearable={isClearable}
                                                    value={selectOptions.find((c) => c.value === value)}
                                                    isRtl={isRtl}
                                                    onChange={(val) => onChange(val?.value)}
                                                    isSearchable={isSearchable}
                                                    name="Category"
                                                    options={selectOptions}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}></FormField>
                                <FormField
                                    control={form.control}
                                    name="profession"
                                    render={({ field }) => (
                                        <FormItem>
                                            <label>{editProfession ? "Update Profession" : "New Profession"}
                                                {editProfession && (
                                                    <b>:{editProfession.profession}</b>
                                                )}
                                            </label>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter Profession"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}></FormField>
                            </div>
                            {/* <FormError message={error} />
                                <FormSuccess message={success} /> */}
                            <div className='pb-2 flex gap-2'>
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    className='py-4'
                                    variant="default">
                                    {editProfession ? 'Update' : 'Create'}
                                </Button>
                                <Button variant='destructive' type='submit' onClick={() => handleCancelClick}>Cancel</Button>
                            </div>


                        </form>
                    </Form>
                    <div className='mt-4'>
                        <Header label='Existing Profession'></Header>
                        {Array.isArray(professions) && professions.length > 0 ? (
                            professions.map((c: ProfessionState) => (
                                <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                                    <div className='grow'>
                                        {c.profession}

                                    </div>
                                    <div className="flex gap-1">

                                        <Button type="button"
                                            onClick={() => {
                                                setEditProfession(c)
                                                setProfessionName(c.profession);
                                                setProfessionId(c.id)
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
                        ) : (<p className='px-4 '>No Profession Available</p>)}

                    </div>

                </div>

            </CardWrapper>

        </main>

    );
};

export default ProfessionPage;
