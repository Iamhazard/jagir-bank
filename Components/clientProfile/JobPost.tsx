/* eslint-disable react/no-unescaped-entities */
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { useForm, useFormContext } from "react-hook-form";


const JobRequired = () => {
  const { register } = useFormContext();
  const {

    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm();
  return (
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
                    <input
                      type="radio"
                      id="projectSize"
                      value="medium"
                      {...register(`jobs.projectSize.4`)}
                    />
                    {errors?.projectSize && <span className="text-red-500">Input  required.</span>}
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
                    <input
                      type="radio"
                      id="projectSize"
                      value="large"
                      {...register("jobs.projectSize.4")}
                    />
                    {errors?.projectSize && <span className="text-red-500">Input  required.</span>}
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
                    <input
                      type="radio"
                      id="projectSize"
                      value="small"
                      {...register("jobs.projectSize.4")}
                    />
                    {errors?.projectSize && <span className="text-red-500">Input  required.</span>}
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
                  <input
                    type="radio"
                    id="duration"
                    value="moreThan6Months"
                    {...register("jobs.duration.5")}
                  />
                  {errors?.duration && <span className="text-red-500">Input  required.</span>}
                  <label
                    htmlFor="moreThan6Months"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    more than 6 months
                  </label>
                </div>
              </div>

              <div className="px-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="duration"
                    value="3to6Months"
                    {...register("jobs.duration.5")}
                  />
                  {errors?.duration && <span className="text-red-500">Input  required.</span>}
                  <label
                    htmlFor="3to6Months"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    3 to 6 months
                  </label>
                </div>
              </div>

              <div className="px-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="duration"
                    value="1to3Months"
                    {...register("jobs.duration.5")}
                  />
                  {errors?.duration && <span className="text-red-500">Input  required.</span>}
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
                    <input
                      type="radio"
                      id="expertise"
                      value="entry"
                      {...register("jobs.expertise.6")}
                    />
                    {errors?.expertise && <span className="text-red-500">Input  required.</span>}
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
                    <input
                      type="radio"
                      value="intermediate"
                      id="expertise"
                      {...register("jobs.expertise.6")}
                    />
                    {errors?.expertise && <span className="text-red-500">Input  required.</span>}
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
                    <input
                      type="radio"
                      value="expert"
                      id="expertise"
                      {...register("jobs.expertise.6")}
                    />
                    {errors?.expertise && <span className="text-red-500">Input  required.</span>}
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
  );
};

export default JobRequired;
