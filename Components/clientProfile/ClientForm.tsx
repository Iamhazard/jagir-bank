/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import ProfileWrapper from "../createProfile/ProfileWrapper";
import JobPost from "./JobPost";
import { z } from "zod";
import FormField from "./FormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ClientSchema } from "@/Schemas";
import { useSession } from "next-auth/react";
import ClientBudget from "./ClientBudget";
import ClientJobs from "./Jobs";
import Address from "./Address";

type Inputs = z.infer<typeof ClientSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Address",
    fields: ["country", "state", "city", "contact", "street", "zip"],
  },

  {
    id: "Step 2 ",
    name: "Skills",
    fields: ["skills1", "skills2", "skills3"],
  },
  {
    id: "Step 3",
    name: "Scope of works",
    fields: ["projectSize", "duration", "expertise"],
  },
  {
    id: "Step 4",
    name: "Rate details",
    fields: ["from", "to", "fixed?"],
  },
  { id: "Step 5", name: "jobDescription", fields: ["jobPost"] },
  { id: "Step 6", name: "Complete" },
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [error, setError] = useState<string | undefined>("");
  const [profiledata, setProfileData] = useState();
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  // const { data: session } = useSession();
  // const userid: string | undefined = session?.user.id;

  const methods = useForm<Inputs>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      county: "",
      street: "",
      contact: "",
      city: "",
      state: "",
      zip: "",
      skills: {
        skill1: "",
        skill2: "",
        skill3: "",
      },
      projectSize: "",
      duration: "",
      expertise: "",
      rate: {
        from: "",
        to: "",
      },
      fixed: "",
      jobDescription: "",
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  const processForm: SubmitHandler<Inputs> = async (values) => {
    console.log(values);
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
                <Address register={register} />
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
                <FormField register={register} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <JobPost register={register} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <ClientBudget register={register} />
              </motion.div>
            )}
            {currentStep === 4 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <ClientJobs register={register} />
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
                <button type="submit">Submit</button>
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
}
