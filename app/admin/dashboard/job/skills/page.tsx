/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import CardWrapper from '@/Components/auth/card-wrapper';
import { ProfessionSchema, SkillsSchema } from '@/Schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/Components/ui/input';
import { FormError } from '@/Components/auth/form-error';
import { FormSuccess } from '@/Components/auth/form-success';
import { Button } from '@/Components/ui/button';
import { CategoryState, ProfessionState, SkillState } from '@/@types/enum';
import { Header } from '@/Components/auth/header';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/store';
import { editCategory, viewCategories } from '@/Redux/Features/admin/CategorySlice';
import { DeleteButton } from '@/app/admin/_component/DeleteButton';
import Select from 'react-select';
import { editProfessions, viewProfessions } from '@/Redux/Features/admin/professionSlice';
import { viewSkills } from '@/Redux/Features/admin/skillsSlice';

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
    profession: string;
    createdAt: string;
    updatedAt: string;
    professions: string[];
}

const SkillsPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const form = useForm<z.infer<typeof SkillsSchema>>({
        defaultValues: {
            skill: "",
            professionId: ""

        }
    })
    const [error, setError] = useState<string | null>("");
    const [professionName, setProfessionName] = useState('');
    const [success, setSuccess] = useState<string | null>("");
    const [categories, setCategories] = useState<Category[]>([])
    const [professions, setProfessions] = useState<Category[]>([])
    const [skills, setSkills] = useState<Category | null>(null)
    const [editProfession, setEditProfession] = useState<SkillState | null>(null);
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
        fetchProfession()

    }, [])

    const fetchProfession = async () => {
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

    useEffect(() => {
        fetchSkills()

    }, [])

    const fetchSkills = async () => {
        try {
            dispatch(viewSkills()).then((res: any) => {
                if (res.payload) {
                    setSkills(res.payload);
                }
            });

        } catch (error) {
            console.log(error)

        }
    }
    console.log("all category from skils ", skills)
    const submitProfession = async (data: any) => {
        console.log(data)

        setSubmitting(true);

        if (editProfession) {
            await dispatch(editProfessions({
                professionId,
                profession: data.profession
            }))
            setSuccessMessage('Profession updated successfully');
            fetchProfession()
            resetForm();

        } else {
            try {
                const response = await fetch('/api/skills/new', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: JSON.stringify(data),
                })
                if (!response.ok) throw new Error("HTTP error " + response.status);
                //console.log(response)

                setSuccessMessage('Category added successfully');
                fetchProfession()
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
            professionId: ""
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
    const selectOptions = professions?.map(category => ({
        value: category.id,
        label: category.profession
    }));

    return (

        <main className="flex mx-auto max-w-[800px] justify-center items-center">
            <CardWrapper
                headerLabel='Skills'
                blackButtonHref='/admin/dashboard'
                backButtonLabel='Back home'
            >
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitProfession)} className="space-y-6">
                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="professionId"
                                    render={({ field: { onChange, value, ref } }) => (
                                        <FormItem>
                                            <label>Profession</label>
                                            <FormControl>
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="Skills"
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
                                    name="skill"
                                    render={({ field }) => (
                                        <FormItem>
                                            <label>{editProfession ? "Update Skills" : "New Skills"}
                                                {editProfession && (
                                                    <b>:{editProfession.title}</b>
                                                )}
                                            </label>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter Skills"
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
                        <Header label='Existing Skills'></Header>
                        {Array.isArray(skills) && skills.length > 0 ? (
                            skills.map((c: SkillState) => (
                                <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center' key={c.id}>
                                    <div className='grow'>
                                        {c.title}

                                    </div>
                                    <div className="flex gap-1">

                                        <Button type="button"
                                            onClick={() => {
                                                setEditProfession(c)
                                                setProfessionName(c.title);
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

export default SkillsPage;
