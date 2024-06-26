/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState, useTransition } from 'react';
import { FormError } from '@/Components/auth/form-error';
import { FormSuccess } from '@/Components/auth/form-success';
import { Button } from '@/Components/ui/button';
import Select from 'react-select';
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
import { CitySchema, StateSchema } from "@/Schemas";
import { z } from "zod";
import { CityState, DistrictState } from '@/@types/enum';
import { Header } from '@/Components/auth/header';
import { DeleteButton } from '@/app/admin/_component/DeleteButton';
import { AppDispatch } from '@/Redux/store';
import { useDispatch } from 'react-redux';
import { viewCategories } from '@/Redux/Features/admin/CategorySlice';
import Link from 'next/link';
import { Separator } from '@/Components/ui/separator';
import { cn } from '@/lib/utils';
import { viewCountry } from '@/Redux/Features/admin/countrySlice';

export interface Countries {
  data: DistrictState[]
}

interface Country {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  professions: string[];
}

const DistrictPage = () => {
  const [error, setError] = useState<string | null>("");
  const [districtname, setDistrictName] = useState('');
  const [success, setSuccess] = useState<string | null>("");
  const [districts, setDistricts] = useState<Countries | null>(null)
  const [editDistrict, setEditDistrict] = useState<CityState | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const [countryId, setCountryId] = useState('')
  const [categories, setCategories] = useState<Countries | null>(null)
  const [countries, setCountries] = useState<Country[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const form = useForm<z.infer<typeof CitySchema>>({
    resolver: zodResolver(CitySchema),
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
    fetchCountries()

  }, [])

  const fetchCountries = async () => {
    try {
      dispatch(viewCountry()).then((res: any) => {
        if (res.payload) {
          setCountries(res.payload);
        }
      });

    } catch (error) {
      console.log(error)

    }
  }
  useEffect(() => {
    fetchCity()

  }, [])

  const fetchCity = async () => {
    try {
      const response = await fetch('/api/city/getcity', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data) {
        setDistricts(data);
      } else {
        console.error('No payload in response:');
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  console.log(districts, "sj")

  const onSubmit = async (values: z.infer<typeof CitySchema>) => {
    setSubmitting(true)
    if (editDistrict) {
      await {
        countryId,
        countryName: values.name
      }
      setSuccessMessage('Country Updated Successfully')
      fetchCity()
      resetForm()

    } else {
      try {
        const response = await fetch('/api/city/new', {
          method: 'POST',
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error("HTTP error " + response.status);
        //console.log(response)

        setSuccessMessage('Category added successfully');
        fetchCity()
        resetForm();
      } catch (error) {
        setErrorMessage('Failed to add category');
        console.error('Error:', error);
      } finally {
        setSubmitting(false)
      }
    }

  };

  const resetForm = () => {
    form.reset({
      name: "",
    });
    setEditDistrict(null);
    setCountryId('');
  };


  const handleCancelClick = () => {
    resetForm();
    setEditDistrict(null);
  };

  const handleDeleteClick = () => {

  }
  const selectOptions = countries?.map(category => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <>
      <Breadcrumb pageName="District" />

      {/* <!-- Normal Button Items --> */}
      <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add District
          </h3>
        </div>

        <div className="p-4 md:p-6 xl:p-9">

          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name="countryId"
                    render={({ field: { onChange, value, ref } }) => (
                      <FormItem>
                        <label>Country</label>
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
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {editDistrict ? "Update District" : "New District"}
                        {editDistrict && (
                          <b>:{editDistrict.name}</b>
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
            List of Districts
          </h3>
        </div>
        <div className='p-4 md:p-6 xl:p-9'>
          <div className='mb-7.5 flex-wrap gap-5 xl:gap-20'>
            <Header label='Existing District' />
            {Array.isArray(districts) && districts.length > 0 ? (
              districts.map((c: CityState) => (

                <div className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center justify-center ' key={c.id}>



                  <Separator className='w-fit'>
                    <Link href="/" className='inline-flex items-center justify-center px-16 py-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10'>
                      {c.name}

                    </Link>
                  </Separator>


                  <div className="flex gap-1">

                    <Button type="button"
                      onClick={() => {
                        setEditDistrict(c)
                        setDistrictName(c.name);
                        setCountryId(c.id)
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
            ) : (<p className='px-4 '>No District Available</p>)}

          </div>
        </div >
      </div >

    </>
  );
};

export default DistrictPage;
