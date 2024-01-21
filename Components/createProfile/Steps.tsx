import React from "react";

import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm, useFormContext } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Nepali", value: "Nep" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const Steps = () => {
  const form = useFormContext();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Form {...form}>
        <form className="mt-6">
          <FormField
            control={form.control}
            name="educationCertificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">
                  Clients like to know what you now -add your education here.
                </FormLabel>
                <p className="text-gray-500 dark:text-gray-40">
                  Add any equivalent degree?
                </p>
                <FormControl>
                  <Input id="picture" type="file" {...field} />
                </FormControl>
                <FormDescription>Add education.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6">
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Clients like to know what you now -add your experience here.
                  </FormLabel>
                  <FormControl>
                    <Input id="picture" type="file" {...field} />
                  </FormControl>
                  <FormDescription>Add experience.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                            : "Select language"}
                          <CaretDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search language..."
                          className="h-9"
                        />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue("language", language.value);
                              }}>
                              {language.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  language.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Steps;
