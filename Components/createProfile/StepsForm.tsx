/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import ProfileWrapper from "./ProfileWrapper";

import { string, z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useSession } from "next-auth/react";
import { FreeLancerSchema } from "@/Schemas";

type Inputs = z.infer<typeof FreeLancerSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Address",
    fields: ["name", "country"],
  },
  {
    id: "Step 2",
    name: "Personal Information",
    fields: ["hourlyrate", "estimatedamount"],
  },
  {
    id: "Step 3",
    name: "bio",
    fields: ["message", "skills", "profession"],
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
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FreeLancerSchema),
    defaultValues: {
      skills: [{

      }],

      country: [
        { name: '', zip: '', Statename: '', cityname: '', address: '' }
      ],
      profession: [{

      }],
    }
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills',
  });

  const { fields: professionFields, append: appendProfession, remove: removeProfession } = useFieldArray({
    control,
    name: 'profession',
  });

  const { fields: countryFields, append: appendCountry, remove: removeCountry } = useFieldArray({
    control,
    name: "country"
  });



  const onChange = (files: any) => {
    setSelectedImage(selectedImage);
    // console.log("Selected files:", files);
  };

  const onFileChange = (files: any) => {
    setSelecteFiles(selectefiles);
    // console.log("Selected edu", files);
  };
  const onexpeChange = (files: any) => {
    setSelecteExpFiles(selecteexpfiles);
    // console.log("Selected edu", files);
  };
  // const processForm: SubmitHandler<Inputs> = async (data) => {
  //   console.log(data, "data from form")
  //   // const addCountry = () => {
  //   //   appendCountry({ name: '', zip: '', Statename: '', cityname: '', address: '' })
  //   // }
  //   try {
  //     //console.log(addCountry,"inside form submit")
  //     const formData = new FormData();
  //     formData.append("userId", userid as string);
  //     formData.append("name", data.name);
  //     formData.append("contact", data.contact);
  //     formData.append("hourlyrate", data.hourlyrate);
  //     formData.append("estimatedamount", data.estimatedamount);
  //     formData.append("message", data.message);
  //     data.skills.forEach((skill, Skillindex) => {
  //       formData.append(`country[${Skillindex}][skill]`, skill.skill);

  //     });
  //     data.profession.forEach((profession, Professionindex) => {
  //       formData.append(`country[${Professionindex}][profession]`, profession.profession);

  //     });
  //     formData.append("language", data.language);
  //     formData.append("imageInput", selectedImage);
  //     formData.append("educationfile", selectefiles);
  //     formData.append("experiencefile", selecteexpfiles);
  //     // console.log(...formData);
  //     console.log("Selected image ", selectedImage);
  //     data.country.forEach((country, index) => {
  //       formData.append(`country[${index}][name]`, country.name);
  //       formData.append(`country[${index}][zip]`, country.zip);
  //       formData.append(`country[${index}][Statename]`, country.Statename);
  //       formData.append(`country[${index}][cityname]`, country.cityname);
  //       formData.append(`country[${index}][address]`, country.address);
  //     });
  //     const formDataObject: any = {};
  //     for (const pair of formData.entries()) {
  //       formDataObject[pair[0]] = pair[1];
  //     }

  //     console.log("formdata obh", formDataObject);

  //     const response = await fetch("api/freelancerprofile/new", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       body: JSON.stringify(formDataObject),
  //     });

  //     if (response.ok) {
  //       const profiledata = await response.json();
  //       console.log("profile data", profiledata);
  //       setProfileData(profiledata);
  //       setSuccess("Profile created successfully");
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.message || "An error occurred");
  //     }
  //   } catch (error) {
  //     setError("An error occurred while processing the request");
  //   }
  // };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data, "data from form")
    // const addCountry = () => {
    //   appendCountry({ name: '', zip: '', Statename: '', cityname: '', address: '' })
    // }
    try {
      const formDataObject: any = {
        userId: userid as string,
        name: data.name,
        contact: data.contact,
        hourlyrate: data.hourlyrate,
        estimatedamount: data.estimatedamount,
        message: data.message,
        language: data.language,
        imageInput: selectedImage,  // Assuming this is a base64 string or a URL
        educationfile: selectefiles,  // Assuming this is a base64 string or a URL
        experiencefile: selecteexpfiles,  // Assuming this is a base64 string or a URL
        country: data.country.map((country, index) => ({
          name: country.name,
          zip: country.zip,
          Statename: country.Statename,
          cityname: country.cityname,
          address: country.address,
        })),
        skills: data.skills.map((skill, inx) => ({
          skill: skill.skill,
        })),
        profession: data.profession.map((pro, ind) => ({
          profession: pro.profession,
        }))
      };

      console.log("formdata obh", formDataObject);

      const response = await fetch("api/freelancerprofile/new", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
        const profiledata = await response.json();
        console.log("profile data", profiledata);
        setProfileData(profiledata);
        setSuccess("Profile created successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      }
    } catch (error) {
      setError("An error occurred while processing the request");
    }
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
      headerLabel="Create a FreeLancer profile"
      backButtonLabel="Back to Register?"
      blackButtonHref="/auth/register">
      <section className=" inset-0 flex flex-col justify-between p-24">
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
              <div className="flex items-center justify-center gap-4 mt-4 ">
                <label
                  htmlFor="imageInput"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 inline-block mr-2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Upload photo
                </label>
                <input
                  type="file"
                  id="imageInput"
                  className="hidden"
                  onChange={(e) => {
                    onChange(e.target.files);
                    setSelectedImage(e.target.files?.[0] || "");
                  }}
                  accept="image/*"
                />
                {selectedImage && (
                  <div className="mt-4 ">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="rounded-full h-16 w-16 object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="mt-2 sm:col-span-3 w-[220px]">
                <label
                  htmlFor='Name'
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  autoComplete="Name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
                {errors.name?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                  </label>
                  {
                    countryFields.map((country, countryIndex) => (
                      <div className="mt-2" key={country.id}>

                        <select
                          id="country"
                          {...register(`country.${countryIndex}.name`)}
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
                    ))
                  }

                </div>



                <div className="col-span-full">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Street address
                  </label>
                  {countryFields.map((streetfield, streetindex) => (
                    <div className="mt-2" key={streetfield.id}>
                      <input
                        type="text"
                        id="street"
                        {...register(`country.${streetindex}.address`)}
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {/* {errors.couaddress?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.address.message}
                        </p>
                      )} */}
                    </div>
                  ))}

                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  {countryFields.map((cityFields, cityIndex: any) => (
                    <div className="mt-2" key={cityFields.id}>
                      <input
                        type="text"
                        id="city"
                        {...register(`country.${cityIndex}.cityname`)}
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {/* {errors.cityname?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.cityname.message}
                        </p>
                      )} */}
                    </div>
                  ))}

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
                  {countryFields.map((stateFields, stateindex) => (
                    <div className="mt-2" key={stateFields.id}>
                      <input
                        type="text"
                        id="state"
                        {...register(`country.${stateindex}.Statename`)}
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {/* {errors.state?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.state.message}
                        </p>
                      )} */}
                    </div>
                  ))}

                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor='zip'
                    className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  {countryFields.map((zipfields, zipIndex) => (
                    <div className="mt-2" key={zipfields.id}>
                      <input
                        type="text"
                        id="zip"
                        {...register(`country.${zipIndex}.zip`)}
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {/* {errors.zip?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.zip.message}
                          </p>
                        )} */}
                    </div>
                  ))}

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
                Now, let s set your hourly rate.
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Clients will see this rate on your profile and search result
                once you publish your profile.You can adjust your rate every
                time you submit proposal
              </p>
              <div className="space-y-4 text-sm mt-4">
                <div className="flex pb-4 justify-between gap-4 items-center">
                  <div>
                    {" "}
                    <h1 className="text-xl flex-1 font-serif">Hourly rate</h1>
                    <p className="text-gray-500">
                      {" "}
                      Total amount client will see.
                    </p>
                  </div>

                  <div className=" flex gap-0.5 items-center">
                    <input
                      type="text"
                      id="hourlyrate"
                      {...register("hourlyrate")}
                      autoComplete=""
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    <span className="text-gray-500">/hr</span>
                    {errors.hourlyrate?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.hourlyrate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex pb-4 justify-between gap-4 items-center">
                  <div>
                    <h1 className="text-xl flex-1 font-serif">Services fee</h1>
                    <p className="text-gray-500">
                      {" "}
                      This helps to run platform and provide protection
                    </p>
                  </div>
                  <div className="mt-2 flex gap-0.5 items-center">
                    <input
                      type="text"
                      id="disabled-input"
                      aria-label="disabled input"
                      className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="$2"
                      disabled
                    />
                    <span className="text-gray-500">/hr</span>
                  </div>
                </div>

                <div className="flex pb-4 justify-between gap-4 items-center">
                  <div>
                    <h1 className="text-xl flex-1 font-serif">You ll get</h1>
                    <p className="text-gray-500">
                      This estimated amount you ll receive .
                    </p>
                  </div>
                  <div className="mt-2 flex gap-0.5 items-center">
                    <input
                      id="estimatedamount"
                      type="text"
                      {...register("estimatedamount")}
                      autoComplete=""
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                    <span className="text-gray-500">/hr</span>
                    {errors.estimatedamount?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.estimatedamount.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <div className="w-2/3 space-y-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tell us a little bit about yourself,skills,experiences and interest."></textarea>
                {errors.message?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <h1 className="text-xl mt-2">
                What are yours main services you offer?
              </h1>
              <p className="text-gray-500 dark:text-gray-40 mt-2">
                Choose at least one services that best describe the type of work
                you do.
              </p>
              <div className="mt-3">
                {skillFields.map((sk, SkillInx: any) => (
                  <div className="sm:col-span-3 mt-3" key={sk.id}>
                    <div className="mt-2">
                      <select
                        id={`skill[${SkillInx}].skill`}
                        {...register(`skills.${SkillInx}.skill`)}
                        autoComplete="skill"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option>Logo design</option>
                        <option>Web, Mobile, & Software Development</option>
                        <option>WordPress design</option>
                        <option>Accounting and Consulting</option>
                        <option>Data Entry</option>
                        <option>Design and Creative</option>
                        <option>Engineering and Architecture</option>
                        <option>Translation</option>
                        <option>Sales and Marketing</option>
                      </select>
                      {errors.profession?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.profession.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

              </div>
              <div className="mt-6">
                <h1 className="text-xl mt-4">Add your Main Profession?</h1>
                <div className="mt-4">
                  {professionFields.map((profession, jobCategoryIndex: any) => (
                    <div className="col-span-full" key={profession.id}>
                      <label
                        htmlFor={`profession[${jobCategoryIndex}].profession`}
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Profession
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id={`profession[${jobCategoryIndex}].profession`}
                          {...register(`profession.${jobCategoryIndex}.profession`)}
                          autoComplete="Software Engineer |Javascript | OS"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                        {/* {errors.jobcategory?.[jobCategoryIndex]?.title && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors?.jobcategory[jobCategoryIndex].title.message}
                          </p>
                        )} */}
                      </div>
                    </div>
                  ))}

                </div>
              </div>
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
                    Language
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

const StateFields: React.FC<{ countryIndex: number, control: any, register: any, errors: any }> = ({ countryIndex, control, register, errors }) => {
  const { fields: stateFields, append: appendState, remove: removeState } = useFieldArray({
    control,
    name: `country.${countryIndex}.state`,
  });

  return (
    <>
      {stateFields.map((state, stateIndex) => (
        <div key={state.id}>
          <input {...register(`country.${countryIndex}.state.${stateIndex}.name`)} placeholder="State Name" />
          {errors.country?.[countryIndex]?.state?.[stateIndex]?.name && <p>{errors.country[countryIndex].state[stateIndex].name?.message}</p>}
          <button type="button" onClick={() => removeState(stateIndex)}>Remove State</button>
        </div>
      ))}
      <button type="button" onClick={() => appendState({ name: '' })}>Add State</button>
    </>
  );
};

const CityFields: React.FC<{ countryIndex: number, control: any, register: any, errors: any }> = ({ countryIndex, control, register, errors }) => {
  const { fields: cityFields, append: appendCity, remove: removeCity } = useFieldArray({
    control,
    name: `country.${countryIndex}.city`,
  });

  return (
    <>
      {cityFields.map((city, cityIndex) => (
        <div key={city.id}>
          <input {...register(`country.${countryIndex}.city.${cityIndex}.name`)} placeholder="City Name" />
          {errors.country?.[countryIndex]?.city?.[cityIndex]?.name && <p>{errors.country[countryIndex].city[cityIndex].name?.message}</p>}
          <button type="button" onClick={() => removeCity(cityIndex)}>Remove City</button>
        </div>
      ))}
      <button type="button" onClick={() => appendCity({ name: '' })}>Add City</button>
    </>
  );
};

const StreetFields: React.FC<{ countryIndex: number, control: any, register: any, errors: any }> = ({ countryIndex, control, register, errors }) => {
  const { fields: streetFields, append: appendStreet, remove: removeStreet } = useFieldArray({
    control,
    name: `country.${countryIndex}.streetAddress`,
  });

  return (
    <>
      {streetFields.map((street, streetIndex) => (
        <div key={street.id}>
          <input {...register(`country.${countryIndex}.streetAddress.${streetIndex}.address`)} placeholder="Street Address" />
          {errors.country?.[countryIndex]?.streetAddress?.[streetIndex]?.address && <p>{errors.country[countryIndex].streetAddress[streetIndex].address?.message}</p>}
          <button type="button" onClick={() => removeStreet(streetIndex)}>Remove Street</button>
        </div>
      ))}
      <button type="button" onClick={() => appendStreet({ address: '' })}>Add Street</button>
    </>
  );
};