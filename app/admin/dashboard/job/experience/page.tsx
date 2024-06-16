/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import CardWrapper from '@/Components/auth/card-wrapper';
import { SkillSchema } from '@/Schemas';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/Components/ui/input';
import { FormError } from '@/Components/auth/form-error';
import { FormSuccess } from '@/Components/auth/form-success';
import { Button } from '@/Components/ui/button';
import { SkillState } from '@/@types/enum';
import { Header } from '@/Components/auth/header';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/store';
import { editCategory, viewCategories } from '@/Redux/Features/CategorySlice';
import { DeleteButton } from '@/app/admin/_component/DeleteButton';

interface Profession {
    name: string,
}

const ProfessionPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const form = useForm<z.infer<typeof SkillSchema>>({
        defaultValues: {
            skill: "",

        }
    })
    const [error, setError] = useState<string | null>("");
    const [skillName, setSkillName] = useState('');
    const [success, setSuccess] = useState<string | null>("");
    const [categories, setCategories] = useState<Profession | null>(null)
    const [editSkills, setEditSkills] = useState<SkillState | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, startTransition] = useTransition();
    const [categoryId, setCategoryId] = useState('')
    const dispatch = useDispatch<AppDispatch>()


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
    console.log("all category", categories)
    const submitCategory = async (data: any) => {

        setSubmitting(true);

        if (editSkills) {
            await dispatch(editCategory({
                categoryId,
                category: data.title
            }))
            setSuccessMessage('Category updated successfully');
            fetchCategories()
            resetForm();

        } else {
            try {
                const response = await fetch('/api/category/new', {
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
            skill: "",
        });
        setEditSkills(null);
        setCategoryId('');
    };

    const handleCancelClick = () => {
        resetForm();
        setEditSkills(null); // Clear the edit state
    };

    const handleDeleteClick = () => {

    }

    return (

        <main className="flex mx-auto max-w-[800px] justify-center items-center">
            <CardWrapper
                headerLabel='Experience'
                blackButtonHref='/admin/dashboard'
                backButtonLabel='Back home'
            >
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitCategory)} className="space-y-6">
                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="skill"
                                    render={({ field }) => (
                                        <FormItem>
                                            <label>{editSkills ? "Update Experience" : "New Experience"}
                                                {editSkills && (
                                                    <b>:{editSkills.skill}</b>
                                                )}
                                            </label>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter Experience"
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
                                    {editSkills ? 'Update' : 'Create'}
                                </Button>
                                <Button variant='destructive' type='submit' onClick={() => handleCancelClick}>Cancel</Button>
                            </div>


                        </form>
                    </Form>
                    <div className='mt-4'>
                        <Header label='Existing Experience'></Header>
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((c: SkillState) => (
                                <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                                    <div className='grow'>
                                        {c.skill}

                                    </div>
                                    <div className="flex gap-1">

                                        <Button type="button"
                                            onClick={() => {
                                                setEditSkills(c)
                                                setSkillName(c.skill);
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
                        ) : (<p className='px-4 '>No Experience Available</p>)}

                    </div>

                </div>

            </CardWrapper>

        </main>

    );
};

export default ProfessionPage;
