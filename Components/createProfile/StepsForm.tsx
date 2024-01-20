/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
import { ProfileSchema } from "@/Schemas";
import ProfileWrapper from "./ProfileWrapper";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import Rate from "./Rate";
import ProfileBio from "./ProfileBio";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface StepperFormProps {}

const StepperForm: React.FC<StepperFormProps> = () => {
  const [step, setStep] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [place, setPlace] = useState<string>("");

  const handleNext = () => setStep((cur) => cur + 1);
  const handlePrev = () => setStep((cur) => cur - 1);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      address: "",
      stateName: "",
      cityName: "",
      phoneNumber: +977,
      PostalCode: 4460,
      date: new Date(),
    },
  });

  const fee = 1;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileWrapper
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
            <div
              className={`h-2 w-2 rounded-full ${
                step >= 3 ? "bg-blue-500" : "bg-gray-300"
              }`}></div>
            <div
              className={`h-2 w-2 rounded-full ${
                step >= 4 ? "bg-blue-500" : "bg-gray-300"
              }`}></div>
          </div>
        </div>

        {step === 0 && (
          <>
            <Form {...form}>
              <form className="space-y-6">
                <div className="flex items-center justify-center mt-4 p-3">
                  <Label
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
                  </Label>
                  <Input
                    type="file"
                    id="imageInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  <div className="mt-4  space-y-3">
                    <Avatar>
                      <AvatarImage
                        className="rounded-full h-16 w-16 object-cover"
                        src="https://github.com/shadcn.png"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}>
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                      name="stateName"
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
                      name="cityName"
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
                      name="phoneNumber"
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
                      name="PostalCode"
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

        {step === 1 && <Rate />}
        {step === 2 && <ProfileBio />}
        {step === 3 && <div className="mt-16"></div>}
        {step === 4 && <div className="mt-16"></div>}

        <div className="mt-16 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={step === 4}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default StepperForm;
