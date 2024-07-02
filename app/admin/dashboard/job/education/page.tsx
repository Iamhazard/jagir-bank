/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import CardWrapper from '@/Components/auth/card-wrapper';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/Components/ui/input';
import { FormError } from '@/Components/auth/form-error';
import { FormSuccess } from '@/Components/auth/form-success';
import { Button } from '@/Components/ui/button';
import { EducationState, SkillState } from '@/@types/enum';
import { Header } from '@/Components/auth/header';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/store';
import { DeleteButton } from '@/app/admin/_component/DeleteButton';
import { EducationSchema } from '@/Schemas';

interface Profession {
    name: string,
}


const EducationPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const form = useForm<z.infer<typeof EducationSchema>>({
        defaultValues: {
            name: "",

        }
    })
    const [error, setError] = useState<string | null>("");
    const [skillName, setSkillName] = useState('');
    const [success, setSuccess] = useState<string | null>("");
    const [educations, setEducations] = useState<Profession | null>(null)
    const [editSkills, setEditSkills] = useState<EducationState | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, startTransition] = useTransition();
    const [categoryId, setCategoryId] = useState('')
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        fetchEducations()

    }, [])

    const fetchEducations = async () => {
        try {
            const reponse = await fetch('/api/job/Education/getEducation', {
                method: 'GET',
            })
            const data = await reponse.json()
            console.log("datafrom response", data)
            setEducations(data)
        } catch (error) {
            console.log(error)
            setEducations(null)
        }
    }
    console.log("all educations", educations)
    const submitCategory = async (data: any) => {

        setSubmitting(true);

        if (editSkills) {
            const response = await axios.patch('/api/job/Education', {
                categoryId,
                category: data.name
            });
            if (response.status === 200) {
                setSuccessMessage('Category updated successfully');
                fetchEducations()
                resetForm();

            }

        } else {
            try {
                const response = await fetch('/api/job/Education/new', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                if (!response.ok) throw new Error("HTTP error " + response.status);
                //console.log(response)

                setSuccessMessage('Category added successfully');
                fetchEducations()
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
            name: "",
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
                headerLabel='Education'
                blackButtonHref='/admin/dashboard'
                backButtonLabel='Back home'
            >
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitCategory)} className="space-y-6">
                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <label>{editSkills ? "Update Education" : "New Education"}
                                                {editSkills && (
                                                    <b>:{editSkills.name}</b>
                                                )}
                                            </label>
                                            <FormControl>S
                                                <Input
                                                    type="text"
                                                    placeholder="Enter Education"
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
                        <Header label='Existing Education'></Header>
                        {Array.isArray(educations) && educations.length > 0 ? (
                            educations.map((c: EducationState) => (
                                <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                                    <div className='grow'>
                                        {c.name}

                                    </div>
                                    <div className="flex gap-1">

                                        <Button type="button"
                                            onClick={() => {
                                                setEditSkills(c)
                                                setSkillName(c.name);
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
                        ) : (<p className='px-4 '>No Team Available</p>)}

                    </div>

                </div>

            </CardWrapper>

        </main>

    );
};

export default EducationPage;
