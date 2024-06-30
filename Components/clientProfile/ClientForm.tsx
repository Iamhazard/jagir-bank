/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";


interface Orgainzations {
  id: string;
  organization: string;

}export interface Countries {
  id: string;
  name: string;
  data: DistrictState[]
}


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import React, { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import ProfileWrapper from "../createProfile/ProfileWrapper";
import { z } from "zod";
import Select, { ActionMeta, MultiValue } from 'react-select'

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { ClientSchema } from "@/Schemas";
import { clientProfile } from "@/actions/clientProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/store";
import { viewCountry } from "@/Redux/Features/admin/countrySlice";
import { DistrictState } from "@/@types/enum";

type Inputs = z.infer<typeof ClientSchema>;

interface Category {
  id: string;
  title: string;
}

interface Skill {
  id: string;
  title: string;
}


const steps = [
  {
    id: "Step 1",
    name: "Job title",
    fields: ["post", "organization"],
  },

  {
    id: "Step 2 ",
    name: "Skills",
    fields: ["skill"],
  },
  {
    id: "Step 3",
    name: "Scope of works",
    fields: ["projectSize", "duration", "expertise"],
  },
  {
    id: "Step 4",
    name: "Rate details",
    fields: ["from", "to", "fixed"],
  },
  { id: "Step 5", name: "jobDescription", fields: ["jobPost"] },
  { id: "Step 6", name: "Complete" },
];

type FormFields = {
  register: string;
  country: string;
  post: string;
  skills: string;
  projectSize: string;
  duration: string;
  expertise: string;
  from: string;
  to: string;
  fixed: string;
  jobDescription: string;
};

const ClientForm: React.FC<Inputs> = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [getorginazations, setgetOrgainzations] = useState<Orgainzations[]>([])
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<null | MultiValue<{ value: string; label: string }>>(null);
  const delta = currentStep - previousStep;
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const [countries, setCountries] = useState<Countries[]>([])

  const methods = useForm<Inputs>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {

      jobs: [{

      }],

    },
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    control,
    setValue,
    formState: { errors },
  } = methods;
  const dispatch: AppDispatch = useDispatch()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "jobs",
  });
  useEffect(() => {
    fetchOrgainzation()

  }, [])

  const fetchOrgainzation = async () => {
    try {
      const respose = await axios.get('/api/job/organization/getOrganization')
      const data = respose.data
      //console.log("datafrom response", data)
      setgetOrgainzations(data)
    } catch (error) {
      console.log(error)
      setgetOrgainzations([]);
    }
  }

  useEffect(() => {
    fetchCountry()

  }, [])

  const fetchCountry = async () => {
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

  //console.log("country", countries)
  const processForm: SubmitHandler<Inputs> = (
    values: z.infer<typeof ClientSchema>
  ) => {
    setError("");
    setSuccess("");
    console.log("vaue befor transition", values)
    startTransition(() => {
      clientProfile(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        router.push('/clientdashboard')

      });
    });
    // reset();
    console.log(values);
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category/getcategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);



  useEffect(() => {

    console.log("Selected categories:", selectedCategory);


    const fetchSkills = async () => {
      if (selectedCategory && selectedCategory.length > 0) {
        try {
          const categoryIds = selectedCategory.map(cat => cat.value).join(',');
          const apiUrl = `/api/skills/getskill?categoryIds=${categoryIds}`;
          //console.log("Fetching skills from:", apiUrl);
          const response = await axios.get(apiUrl);
          setSelectedSkills(response.data);
        } catch (error) {
          console.error('Error fetching skills:', error);
        }
      } else {

        setSelectedSkills([]);
      }
    };

    fetchSkills();
  }, [selectedCategory]);


  //console.log({ selectedSkills })


  const handleCategoryChange = (selectedOption: MultiValue<{ value: string; label: string }>) => {
    setSelectedCategory(selectedOption);
  };
  return (
    <ProfileWrapper
      headerLabel="Create a Client profile"
      backButtonLabel="Back to Register?"
      blackButtonHref="/auth/register">
      <section className=" inset-0 flex flex-col justify-between p-10">
        {/* steps */}
        <nav aria-label="Progress">
          <ol
            role="list"
            className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-sky-600 transition-colors ">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                    aria-current="step">
                    <span className="text-sm font-medium text-sky-600">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-gray-500 transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <FormProvider {...methods}>
          {/* Form */}
          <form className="mt-4 py-4" onSubmit={handleSubmit(processForm)}>
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Job Title
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This helps your job post stand out the right candidate.it's the first
                    thing they'll see make it count.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="post"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Write a tittle for your job post
                      </label>
                      <div className="mt-2">
                        {fields.map((field, index) => (
                          <input
                            key={field.id}
                            type="text"
                            id={`post_${index}`}
                            {...register(`jobs.${index}.post`)}
                            autoComplete="web"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                          />
                        ))}



                        <span>
                          <p className="text-sm py-4">Examples</p>
                          <small className="text-gray-500">
                            <li>
                              Build responsive WordPress site with booking/payment
                              functionality
                            </li>
                            <li>AR experience needed for virtual product demos (ARCore)</li>
                            <li>
                              Developer needed to update Android app UI for new OS/device
                              specs
                            </li>
                          </small>
                        </span>
                      </div>
                      <div className="py-3">
                        <label
                          htmlFor="post"
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Organization types
                        </label>
                        {fields.map((field, index) => (
                          <Select
                            isMulti
                            key={field.id}
                            options={getorginazations?.map(pro => ({ value: pro.id, label: pro.organization }))}
                            id={`organization_${index}`}
                            {...register(`jobs.${index}.organization`)}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(selectedOption: any, actionMeta: any) => {
                              setValue(`jobs.${index}.organization`, selectedOption.map((sk: any) => ({ countryname: sk.name, countryId: sk.value })));
                            }}
                          />

                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="category"

                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select a country</option>
                          {countries.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {/* {errors.country && <p className="mt-2 text-sm text-red-400">{errors.country.message}</p>} */}



                      </div>
                    </div>
                  </div>
                </>
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  What are the main skills require for your work?
                </h2>
                <h2 className="mt-1 text-sm leading-6 text-gray-600 py-2">Category</h2>
                <Select
                  isMulti
                  name="category"
                  options={categories.map((category) => ({ value: category.id, label: category.title }))}
                  className="basic-multi-select"
                  onChange={handleCategoryChange}
                  classNamePrefix="select"
                />
                <div>

                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Select skills
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Add 3 skills for best result
                  </p>

                  {fields.map((field, index) => (


                    <Select
                      isMulti
                      key={field.id}
                      options={selectedSkills.map(skill => ({ value: skill.id, label: skill.title }))}
                      id={`skill${index}`}
                      {...register(`jobs.${index}.skills`)}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(selectedOption: any, actionMeta: any) => {
                        setValue(`jobs.${index}.skills`, selectedOption.map((sk: any) => ({ skill: sk.value })));
                      }}
                    />
                  ))}
                </div>
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Popular skills
                  </h2>
                  <div className="flex gap-3">

                  </div>
                </div>




              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <div className="mt-4">
                  <div className="flex ">
                    <h1 className="text-2xl text-gray-800 ">
                      Next,estimate the Scope of your works?
                    </h1>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Consider your size of project</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex-col items-center space-y-3">
                          <div className="flex flex-col px-6 space-y-2">
                            <div className="flex items-center">
                              <>
                                {fields.map((field, index) => (
                                  <input
                                    key={field.id}
                                    type="radio"
                                    value="medium"
                                    id={`projectSize${index}`}
                                    {...register(`jobs.${index}.projectSize`)}
                                    autoComplete="web"
                                  />
                                ))}


                                <label
                                  htmlFor="medium"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2 radio-label">
                                  Medium
                                </label>
                              </>
                            </div>
                            <small className="text-gray-500">Well defined project</small>
                          </div>

                          <div className="flex flex-col px-6 space-y-2">
                            <div className="flex items-center">
                              <>
                                {fields.map((field, index) => (
                                  <input
                                    key={field.id}
                                    type="radio"
                                    value="large"
                                    id={`projectSize${index}`}
                                    {...register(`jobs.${index}.projectSize`)}
                                    autoComplete="web"
                                  />
                                ))}

                                <label
                                  htmlFor="large"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2 radio-label">
                                  Large
                                </label>
                              </>
                            </div>
                            <small className="text-gray-500">
                              Larger and complex project
                            </small>
                          </div>

                          <div className="flex flex-col px-6 space-y-2">
                            <div className="flex items-center">
                              <>
                                {fields.map((field, index) => (
                                  <input
                                    key={field.id}
                                    type="radio"
                                    value="small"
                                    id={`projectSize${index}`}
                                    {...register(`jobs.${index}.projectSize`)}
                                    autoComplete="web"
                                  />
                                ))}
                                <label
                                  htmlFor="small"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                                  Small
                                </label>
                              </>
                            </div>
                            <small className="text-gray-500">Very small project</small>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How long will your work take?</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex-col items-center space-y-3">
                          <div className="px-6">
                            <div className="flex items-center">

                              {fields.map((field, index) => (
                                <input
                                  key={field.id}
                                  type="radio"
                                  value="moreThan6Months"
                                  id={`duration${index}`}
                                  {...register(`jobs.${index}.duration`)}
                                  autoComplete="web"
                                />
                              ))}

                              <label
                                htmlFor="moreThan6Months"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                                more than 6 months
                              </label>
                            </div>
                          </div>

                          <div className="px-6">
                            <div className="flex items-center">
                              {fields.map((field, index) => (
                                <input
                                  key={field.id}
                                  type="radio"
                                  value="3to6Months"
                                  id={`duration${index}`}
                                  {...register(`jobs.${index}.duration`)}
                                  autoComplete="web"
                                />
                              ))}
                              <label
                                htmlFor="3to6Months"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                                3 to 6 months
                              </label>
                            </div>
                          </div>

                          <div className="px-6">
                            <div className="flex items-center">
                              {fields.map((field, index) => (
                                <input
                                  key={field.id}
                                  type="radio"
                                  value="1to3Months"
                                  id={`duration${index}`}
                                  {...register(`jobs.${index}.duration`)}
                                  autoComplete="web"
                                />
                              ))}
                              <label
                                htmlFor="1to3Months"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                                1 to 3 months
                              </label>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        What level of experiences will it need?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex-col items-center space-y-3">
                          <div className="flex flex-col px-6 space-y-2">
                            <div className="flex ">
                              <>
                                {fields.map((field, index) => (
                                  <input
                                    key={field.id}
                                    type="radio"
                                    value="expertise"
                                    id={`expertise${index}`}
                                    {...register(`jobs.${index}.expertise`)}
                                    autoComplete="web"
                                  />
                                ))}

                                <label
                                  htmlFor="entry"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                                  Entry
                                </label>
                              </>
                            </div>
                            <small className="text-gray-500">
                              Looking for someone relatively new to this field
                            </small>
                          </div>

                          <div className="flex flex-col px-6 space-y-2">
                            <div className="flex">
                              <>
                                {fields.map((field, index) => (
                                  <input
                                    key={field.id}
                                    type="radio"
                                    value="intermediate"
                                    id={`expertise${index}`}
                                    {...register(`jobs.${index}.expertise`)}
                                    autoComplete="web"
                                  />
                                ))}
                                <label
                                  htmlFor="intermediate"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                                  Intermediate
                                </label>
                              </>
                            </div>
                            <small className="text-gray-500">
                              Looking for substantial experience.
                            </small>
                          </div>

                          <div className="flex flex-col px-6 space-y-2">
                            <div className="flex">
                              <>
                                {fields.map((field, index) => (
                                  <input
                                    key={field.id}
                                    type="radio"
                                    value="expert"
                                    id={`expertise${index}`}
                                    {...register(`jobs.${index}.expertise`)}
                                    autoComplete="web"
                                  />
                                ))}
                                <label
                                  htmlFor="expert"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                                  Expert
                                </label>
                              </>
                            </div>
                            <small className="text-gray-500">
                              Looking for deep expertise in the field
                            </small>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Hourly rate!</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-center gap-4">
                          <div>
                            <label
                              htmlFor="number-input"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              From:
                            </label>

                            {fields.map((field, index) => (
                              <input
                                className="rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"

                                key={field.id}
                                type="text"
                                id={`from${index}`}
                                {...register(`jobs.${index}.from`)}
                                autoComplete="web"
                              />
                            ))}
                            <span className="text-gray-400 p-1">/hr</span>
                          </div>

                          <div>
                            <label
                              htmlFor="number-input"
                              className="block mb-2text-sm font-medium text-gray-900 dark:text-white">
                              To:
                            </label>
                            {fields.map((field, index) => (
                              <input
                                className="rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"

                                key={field.id}
                                type="text"
                                id={`to${index}`}
                                {...register(`jobs.${index}.to`)}
                                autoComplete="web"
                              />
                            ))}
                            <span className="text-gray-400 p-1">/hr</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Fixed Price?</AccordionTrigger>
                      <AccordionContent>
                        <p>Set price for the project and pay at the end.</p>
                        <div>
                          <h1>What is the best estimate for your Projects</h1>
                          <small>
                            You cand negotiate this cost and create milestones when you chat
                          </small>

                          {fields.map((field, index) => (
                            <input
                              className="rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"

                              key={field.id}
                              type="text"
                              id={`fixed${index}`}
                              {...register(`jobs.${index}.fixed`)}
                              autoComplete="web"
                            />
                          ))}

                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <small className="text-Green mt-5 ">Not ready to set an hour rate?</small>
                </>
              </motion.div>
            )}
            {currentStep === 4 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <>
                  <div className="flex justify-between gap-10">
                    <div className=" max-w-[200px]">
                      <small>Job Post</small>
                      <h1 className="text-2xl">Start the conversation</h1>

                      <p className=" py-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Talents are looking for:
                      </p>
                      <ul className=" space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                        <li>
                          <small>The skills required for your work</small>
                        </li>
                        <li>
                          <small>Clear expectations about your task or deliverables.</small>
                        </li>
                        <li>
                          <small>Details about how you or your team like to work.</small>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 mt-6">
                      <h2>Describe what you need</h2>

                      <>
                        {fields.map((field, index) => (
                          <textarea
                            key={field.id}
                            rows={12}
                            id={`jobDescription${index}`}
                            {...register(`jobs.${index}.jobDescription`)}
                            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  "border-red-500"
                              }`}
                            placeholder="Describe the jobs"
                          />
                        ))}


                      </>
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <span>
                      <Link href="/">Need help?</Link>
                    </span>
                    <p>see some examples!</p>
                  </div>
                </>
              </motion.div>
            )}
            {currentStep === 5 && (
              <>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Complete
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Thank you for your submission.
                </p>

              </>
            )}
          </form>
        </FormProvider>

        {/* Navigation */}
        <div className="mt-8 pt-5">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </ProfileWrapper>
  );
};

export default ClientForm;

