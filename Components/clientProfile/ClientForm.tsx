/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import ProfileWrapper from "../createProfile/ProfileWrapper";
import JobPost from "./JobPost";
import { string, z } from "zod";
import FormField from "./FormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ClientSchema } from "@/Schemas";
import { useSession } from "next-auth/react";

type Inputs = z.infer<typeof ClientSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Address",
    fields: ["country", "state", "city", "contact", "street", "zip"],
  },
  {
    id: "Step 2",
    name: "Personal Information",
    fields: ["hourlyrate", "estimatedamount"],
  },
  {
    id: "Step 3",
    name: "bio",
    fields: ["message", "program", "profession"],
  },
  {
    id: "Step 4",
    name: "Education details",
    fields: ["language"],
  },
  { id: "Step 5", name: "Complete" },
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [selectedImage, setSelectedImage] = useState<File | "">("");
  const [selectefiles, setSelecteFiles] = useState<File | "">("");
  const [selecteexpfiles, setSelecteExpFiles] = useState<File | "">("");
  const [error, setError] = useState<string | undefined>("");
  const [profiledata, setProfileData] = useState();
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const userid: string | undefined = session?.user.id;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ClientSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    // try {
    //   const formData = new FormData();
    //   formData.append("userId", userid as string);
    //   formData.append("country", data.country);
    //   formData.append("street", data.street);
    //   formData.append("city", data.city);
    //   formData.append("contact", data.contact);
    //   formData.append("state", data.state);
    //   formData.append("zip", data.zip);
    //   formData.append("hourlyrate", data.hourlyrate);
    //   formData.append("estimatedamount", data.estimatedamount);
    //   formData.append("message", data.message);
    //   formData.append("program", data.program);
    //   formData.append("profession", data.profession);
    //   formData.append("language", data.language);
    //   formData.append("imageInput", selectedImage);
    //   formData.append("educationfile", selectefiles);
    //   formData.append("experiencefile", selecteexpfiles);
    //   // console.log(...formData);
    //   console.log("Selected image ", selectedImage);
    //   const formDataObject: any = {};
    //   for (const pair of formData.entries()) {
    //     formDataObject[pair[0]] = pair[1];
    //   }
    //   console.log("formdata obh", formDataObject);
    //   const response = await fetch("api/freelancerprofile/new", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     body: JSON.stringify(formDataObject),
    //   });
    //   if (response.ok) {
    //     const profiledata = await response.json();
    //     console.log("profile data", profiledata);
    //     setProfileData(profiledata);
    //     setSuccess("Profile created successfully");
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || "An error occurred");
    //   }
    // } catch (error) {
    //   setError("An error occurred while processing the request");
    // }
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    // const output = await trigger(fields as FieldName[], { shouldFocus: true });

    // if (!output) return;

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

  return (
    <ProfileWrapper
      headerLabel="Create a FreeLancer profile"
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

        {/* Form */}
        <form className="mt-4 py-4" onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      {...register("country")}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option>Nepal</option>
                      <option>India</option>
                      <option>China</option>
                      <option>Srilanka</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>Austraia</option>
                    </select>
                    {errors.country?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="street"
                      {...register("street")}
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.street?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.street.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="city"
                      {...register("city")}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.city?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Contact Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="contact"
                      {...register("contact")}
                      autoComplete="9860"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.contact?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.contact.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="state"
                      {...register("state")}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.state?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="zip"
                      {...register("zip")}
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    {errors.zip?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.zip.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
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
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Add 3 skills for best result
              </p>
              <div className="space-y-4 text-sm mt-4">
                <FormField
                  type="text"
                  placeholder="Enter skill"
                  name="skill1"
                  register={register}
                  error={error.skill1}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <JobPost />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <div className="gap-4">
                <div>
                  <span className="text-xl">
                    Clients like to know what you now -add your education here.
                  </span>
                  <h1 className="text-xl">Add education.</h1>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="educationfile"
                    type="file"
                    onChange={(e) => {
                      onFileChange(e.target.files);
                      setSelecteFiles(e.target.files?.[0] || "");
                    }}
                  />
                  <p className="text-gray-500 dark:text-gray-40 p-2">
                    Add any equivalent degree?
                  </p>
                </div>
                <div>
                  <span className="text-xl">
                    Clients like to know what you now -add your experience here.
                  </span>
                  <h1 className="text-xl">Add experience.</h1>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="experiencefile"
                    type="file"
                    onChange={(e) => {
                      onexpeChange(e.target.files);
                      setSelecteExpFiles(e.target.files?.[0] || "");
                    }}
                  />
                  <p className="text-gray-500 dark:text-gray-40 p-2">
                    Add any equivalent experience?
                  </p>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="language"
                      {...register("language")}
                      autoComplete="Nepali"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option>Nepali</option>
                      <option>Hindi</option>
                      <option>Chinese</option>
                      <option>English</option>
                      <option>French</option>
                    </select>
                    {errors.language?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.language.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {currentStep === 4 && (
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
}
