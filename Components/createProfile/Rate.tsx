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

const Rate = () => {
  const [isPending, startTransition] = useTransition();
  const form = useFormContext();

  return (
    <div className="mt-4">
      <h1 className=" mb-3 text-2xl font-semibold">
        Now, let's set your hourly rate.{" "}
      </h1>
      <p className="text-gray-500 dark:text-gray-40">
        Clients will see this rate on your profile and search result once you
        publish your profile.You can adjust your rate every time you submit
        proposal
      </p>
      <div className="mt-4">
        <Form {...form}>
          <div className="space-y-4 text-sm">
            <div className="flex pb-4 justify-between gap-4 items-center">
              <div>
                <h1 className="text-xl flex-1 font-serif">Hourly rate</h1>
                <p className="text-gray-500"> Total amount client will see.</p>
              </div>
              <div className="flex gap-0.5 items-center">
                <FormField
                  control={form.control}
                  name="hourlyRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          aria-disabled
                          type="number"
                          id="hourlyRate"
                          className={cn(" rounded-md w-24")}
                          placeholder="0"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}></FormField>
                <span className="text-gray-500">/hr</span>
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
              <div className="flex gap-0.5 items-center">
                {" "}
                <FormField
                  control={form.control}
                  name="servicesFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          className={cn(" rounded-md w-24")}
                          placeholder="0"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}></FormField>
                <span className="text-gray-500">/hr</span>
              </div>
            </div>
            <div className="flex pb-4 justify-between gap-4 items-center">
              <div>
                <h1 className="text-xl flex-1 font-serif">You'll get</h1>
                <p className="text-gray-500">
                  This estimated amount you'll receive .
                </p>
              </div>
              <div className="ml-2 flex gap-0.5 items-center">
                {" "}
                <FormField
                  control={form.control}
                  name="estimatedAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          className={cn(" rounded-md w-24")}
                          placeholder="0"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}></FormField>
                <span className="text-gray-500">/hr</span>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Rate;
