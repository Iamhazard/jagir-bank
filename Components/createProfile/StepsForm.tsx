/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { CldUploadButton } from "next-cloudinary";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import ProfileWrapper from "./ProfileWrapper";

import { z } from "zod";
import Select from 'react-select';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
import { FreeLancerSchema, freelanceSchema } from "@/Schemas";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/store";
import { viewProfessions } from "@/Redux/Features/admin/professionSlice";
import { viewSkills } from "@/Redux/Features/admin/skillsSlice";
import axios from "axios";

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
    fields: ["message", "profession", "skills"],
  },
  {
    id: "Step 4",
    name: "Education details",
    fields: ["language"],
  },
  { id: "Step 5", name: "Complete" },
];

interface Categorys {
  profession: string;
  id: string;
  skill: string;
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
interface ApiResponse {
  success: boolean;
  profile: {
    success: any;
    fileData: {
      filePath: string;
    };

  };
}


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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const userid: string | undefined = session?.user.id;
  const [skill, setSkills] = useState<Category[]>([])
  const [professions, setProfessions] = useState<Categorys[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FreeLancerSchema),
    defaultValues: {
      name: "",
      country: [
        { name: '', zip: '', Statename: '', cityname: '', address: '' }
      ],
      contact: "",
      hourlyrate: "",
      estimatedamount: "",
      message: "",
      category: [{ professions: [{ profession: "" }], skills: [{ skill: "" }] }],
      language: ""

    }
  });



  const { fields: countryFields, append: appendCountry, remove: removeCountry } = useFieldArray({
    control,
    name: "country"
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "category",
  });



  const Imagechangehandler = () => {


  }

  const handleUpload = (result: any) => {

    try {
      if (result.event === 'success') {
        setUploadedImageUrl(result.info.url);
      }
      const imageUrl = result?.info?.secure_url;
      console.log({ imageUrl })

      if (imageUrl) {
        setImageUrl(imageUrl);


      }
      else {
        console.error("Image URL is null or undefined");
      }

    } catch (error) {
      console.log(error)
    }

  };


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

  // console.log(professions)
  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data, "data from form");


    try {
      const fd = new FormData();
      // Append non-nested values to FormData
      fd.append('userId', (userid) as string);
      fd.append('name', (data.name));
      fd.append('contact', (data.contact));
      fd.append('hourlyrate', (data.hourlyrate));
      fd.append('estimatedamount', (data.estimatedamount));
      fd.append('message', (data.message));
      fd.append('language', (data.language));
      if (imageUrl) {
        fd.append('imageUrl', imageUrl)
      }


      data.country.forEach((country, index) => {
        fd.append(`country[${index}].name`, country.name);
        fd.append(`country[${index}].zip`, country.zip);
        fd.append(`country[${index}].Statename`, country.Statename);
        fd.append(`country[${index}].cityname`, country.cityname);
        fd.append(`country[${index}].address`, country.address);
      });

      // Append nested category values
      data.category.forEach((category, categoryIndex) => {
        category.professions.forEach((profession, professionIndex) => {
          fd.append(`category[${categoryIndex}].professions[${professionIndex}].profession`, profession.profession);
        });

        category.skills.forEach((skill, skillIndex) => {
          fd.append(`category[${categoryIndex}].skills[${skillIndex}].skill`, skill.skill);
          fd.append(`category[${categoryIndex}].skills[${skillIndex}].skillId`, skill.skill);
        });
      });
      const formDataObject: any = {};
      for (const pair of fd.entries()) {
        formDataObject[pair[0]] = pair[1];
      }

      console.log(formDataObject, "formdataobj")

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
      console.error('An error occurred while processing the request:', error);
      setError("An error occurred while processing the request");
    }
  };

  type FieldName = keyof Inputs;

  const hourlyrate = watch('hourlyrate');
  useEffect(() => {
    const serviceFee = (parseFloat(hourlyrate) || 0) * 0.2;
    const estimatedAmount = (parseFloat(hourlyrate) || 0) - serviceFee;
    setValue('estimatedamount', estimatedAmount.toFixed(2));
  }, [hourlyrate, setValue]);

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
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleUpload}
                  uploadPreset="i1ziapfw"

                >
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
                    onChange={Imagechangehandler}
                    accept="image/*"
                  />
                </CldUploadButton>
                {uploadedImageUrl && (
                  <div className="mt-4 ">
                    <img
                      src={uploadedImageUrl}
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
                      {...register("hourlyrate", { required: "Hourly rate is required" })}
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
                      value={`$${((parseFloat(hourlyrate) || 0) * 0.1).toFixed(2)}`}
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
                      readOnly
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
                  Your Bio
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

                <div className="col-span-full" >
                  <label
                    htmlFor={`profession`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Profession

                  </label>

                  <div className="mt-2" >

                    {fields.map((field, index) => (
                      <Select
                        isMulti
                        key={field.id}
                        options={professions.map(pro => ({ value: pro.id, label: pro.profession }))}
                        id={`skill${index}`}
                        {...register(`category.${index}.professions`)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selectedOption: any, actionMeta: any) => {
                          setValue(`category.${index}.professions`, selectedOption.map((sk: any) => ({ profession: sk.value })));
                        }}
                      />
                    ))}



                  </div>


                </div>

              </div>
              <div className="mt-6">
                <h1 className="text-xl mt-4">Add your Main Skils?</h1>
                <div className="mt-1">



                  <div className="sm:col-span-3 mt-3">
                    <div className="py-2">

                      {fields.map((field, ind) => (


                        <Select
                          isMulti
                          key={field.id}
                          options={skill.map(sk => ({ value: sk.id, label: sk.title }))}
                          id={`skill${ind}`}
                          {...register(`category.${ind}.skills`)}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(selectedOption: any, actionMeta: any) => {
                            setValue(`category.${ind}.skills`, selectedOption.map((sk: any) => ({ skill: sk.value })));
                          }}
                        />
                      ))}

                    </div>
                  </div>




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

