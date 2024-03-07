'use client'
import { Card } from '@/Components/ui/card';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Category = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submitCategory = async (data: any) => {
        setSubmitting(true);
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
            reset();
        } catch (error) {
            setErrorMessage('Failed to add category');
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <header className="bg-transparent shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Skills</h1>
                </div>
            </header>
            <main className="flex mx-auto max-w-[800px] justify-center items-center mt-10">
                <Card className="py-4 justify-center items-center">

                    <form onSubmit={handleSubmit(submitCategory)} className="px-4 py-4">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Category Name
                                </label>
                                <input
                                    className="appearance-none block  bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="title"
                                    type="text"
                                    placeholder=""
                                    {...register('title', {
                                        required: true,

                                    })}
                                />
                                {errors.title && (
                                    <span className="text-red-600 text-bold">
                                        Invalid category name
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-5 space-x-1">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                        {successMessage && <p className="text-green-600">{successMessage}</p>}
                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    </form>
                </Card>

            </main>
        </>
    );
};

export default Category;
