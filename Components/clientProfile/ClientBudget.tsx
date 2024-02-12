import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";

const ClientBudget = () => {
  const { register } = useFormContext();
  const {

    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm();
  return (
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
                <input
                  className="rounded-md border-0  p-4  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  type="text"
                  id="from"
                  {...register("jobs.form.7")}
                />
                <span className="text-gray-400 p-1">/hr</span>
              </div>

              <div>
                <label
                  htmlFor="number-input"
                  className="block mb-2text-sm font-medium text-gray-900 dark:text-white">
                  To:
                </label>
                <input
                  className="rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  type="text"
                  id="to"
                  {...register("jobs.to.8")}
                />
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

              <input
                className="rounded-md border-0 p-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                placeholder="0"
                type="text"
                id="fixed"
                {...register("jobs.fixed.9")}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <small className="text-Green mt-5 ">Not ready to set an hour rate?</small>
    </>
  );
};

export default ClientBudget;
