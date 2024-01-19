/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/Schemas";
import ProfileWrapper from "./ProfileWrapper";
import DatePickers from "./DatePiker";
import { cn, formatPrice } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface StepperFormProps {}

const StepperForm: React.FC<StepperFormProps> = () => {
  const [step, setStep] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [place, setPlace] = useState<string>("");

  const handleNext = () => setStep((cur) => cur + 1);
  const handlePrev = () => setStep((cur) => cur - 1);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const fee = 1;
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setSelectedImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileWrapper
      className="w-fit shadow-md  my-4"
      headerLabel="Create a profile"
      backButtonLabel="Back to Register?"
      blackButtonHref="/auth/register">
      <div className="w-full py-2 px-8">
        <div className="flex justify-center">
          <div className="flex items-center">
            <div
              className={`h-2 w-2 rounded-full ${
                step >= 0 ? "bg-blue-500" : "bg-gray-300"
              }`}></div>
            <div
              className={`h-2 w-2 rounded-full ${
                step >= 1 ? "bg-blue-500" : "bg-gray-300"
              }`}></div>
            <div
              className={`h-2 w-2 rounded-full ${
                step >= 2 ? "bg-blue-500" : "bg-gray-300"
              }`}></div>
          </div>
        </div>

        {step === 0 && (
          <>
            <Form {...form}>
              <div className="flex items-center justify-center mt-4 p-3">
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
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <div className="mt-4">
                    <div className="mt-4">
                      <img
                        src={selectedImage}
                        alt="Selected Image"
                        className="rounded-full h-16 w-16 object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <DatePickers />
                    </div>
                    <div className="w-fit md:w-1/2 px-3">
                      <Select>
                        <SelectTrigger className={cn("rounded-full w-[180px]")}>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="np">Nepal</SelectItem>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="aus">Australia</SelectItem>
                            <SelectItem value="usa">USA</SelectItem>
                            <SelectItem value="uk">UK</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address*</FormLabel>
                        <FormControl>
                          <Input
                            type="address"
                            className={cn("rounded-full")}
                            placeholder="Enter your street address"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}></FormField>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-fit md:w-1/2 px-3 mb-6 md:mb-0">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> State/Province</FormLabel>
                          <FormControl>
                            <Input
                              type="name"
                              placeholder="Enter State/Province"
                              className={cn("rounded-full")}
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}></FormField>
                  </div>
                  <div className="w-fit md:w-1/2 px-3">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter City</FormLabel>
                          <FormControl>
                            <Input
                              type="name"
                              className={cn("rounded-full")}
                              placeholder="Enter City"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}></FormField>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-fit md:w-1/2 px-3 mb-6 md:mb-0">
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> Phone*</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter Phone Number"
                              className={cn("rounded-full")}
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}></FormField>
                  </div>
                  <div className="w-fit md:w-1/2 px-3">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP/Postal Code</FormLabel>
                          <FormControl>
                            <Input
                              type="Zip"
                              className={cn("rounded-full")}
                              placeholder="Enter Postal code"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}></FormField>
                  </div>
                </div>
              </form>
            </Form>
          </>
        )}

        {step === 1 && (
          <div className="mt-4">
            <h1 className=" mb-3 text-2xl font-semibold">
              Now, let's set your hourly rate.{" "}
            </h1>
            <p className="text-gray-500 dark:text-gray-40">
              Clients will see this rate on your profile and search result once
              you publish your profile.You can adjust your rate every time you
              submit proposal
            </p>
            <div className="mt-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <h1 className="text-xl flex-1 font-serif">Hourly rate</h1>
                  <p className=""> Total amount client will see.</p>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <h1 className="text-xl flex-1 font-serif">Services fee</h1>
                  <p className="">
                    {" "}
                    This helps to run platform and provide protection
                  </p>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex items-center">
                  <h1 className="text-xl flex-1 font-serif">You'll get</h1>
                  <p className="text-gray-500">
                    This estimated amount you'll receive .
                  </p>
                  <span className="ml-2">
                    {" "}
                    <Input type="number" className={cn(" rounded-md w-24")} />
                    /hr
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mt-4">
                <h1 className="text-xl font-serif">Hourly rate</h1>
                <p className="text-gray-500 dark:text-gray-40">
                  Total amount client will see.
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mt-4">
                <h1 className="text-xl font-serif">Hourly rate</h1>
                <p className="text-gray-500 dark:text-gray-40">
                  Total amount client will see.
                </p>
                <Input type="number" className={cn("rounded-full")} />
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="mt-16">
            <label
              htmlFor="place"
              className="block text-sm font-medium text-gray-700">
              id
            </label>
            <input
              type="text"
              name="place"
              id="place"
              autoComplete="address-level2"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        )}

        <div className="mt-16 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={step === 2}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default StepperForm;
