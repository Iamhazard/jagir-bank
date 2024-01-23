/* eslint-disable react/no-unescaped-entities */
import React, { useTransition } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const JobPost = () => {
  const [isPending, startTransition] = useTransition();
  const form = useFormContext();
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
                <div className="flex ">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    Medium
                  </label>
                </div>
                <small className=" text-gray-500">Well defined project</small>
              </div>

              <div className="flex flex-col px-6  space-y-2">
                <div className="flex">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    Large
                  </label>
                </div>
                <small className=" text-gray-500">
                  Larger and complex project
                </small>
              </div>

              <div className="flex flex-col px-6 space-y-2">
                <div className="flex">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    Small
                  </label>
                </div>
                <small className=" text-gray-500">Very small project</small>
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
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                  more than 6 months
                </label>
              </div>

              <div className="px-6">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                  3 to 6 months
                </label>
              </div>

              <div className="px-6">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                  1 to 3 months
                </label>
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
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    Entry
                  </Label>
                </div>
                <small className=" text-gray-500">
                  Looking for someOne relatively new to this field
                </small>
              </div>

              <div className="flex flex-col px-6  space-y-2">
                <div className="flex">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    Intermediate
                  </label>
                </div>
                <small className=" text-gray-500">
                  Looking for substantial experience.
                </small>
              </div>

              <div className="flex flex-col px-6 space-y-2">
                <div className="flex">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    Expert
                  </label>
                </div>
                <small className=" text-gray-500">
                  Looking for Deep expertise in the field
                </small>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default JobPost;
