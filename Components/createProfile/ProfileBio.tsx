import React from "react";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { CheckIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";

const languages = [
  { label: "Logo design", value: "en" },
  { label: "Web, Mobile, & Software Development", value: "fr" },
  { label: "WordPress design", value: "de" },
  { label: "Accounting and Consulting", value: "es" },
  { label: "Data Entry", value: "pt" },
  { label: "Design and Creative", value: "ru" },
  { label: "Engineering and Architecture", value: "ja" },
  { label: "Translation", value: "ko" },
  { label: "Sales and Marketing", value: "zh" },
] as const;

const ProfileBio = () => {
  const form = useFormContext();
  return (
    <div className="mt-6">
      <Form {...form}>
        <form className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Bio</FormLabel>
                <p className="text-gray-500 dark:text-gray-40">
                  Help people to know you at glance.What you do best?
                </p>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself,skills,experiences and interest."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>At least 100 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <h1 className="text-xl mt-2">
          What are yours main services you offer?
        </h1>
        <p className="text-gray-500 dark:text-gray-40 mt-2">
          Choose at least one services that best describe the type of work you
          do.
        </p>
        <div className="mt-3">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[300px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value
                          ? languages.find(
                              (language) => language.value === field.value
                            )?.label
                          : "Select for services"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search more services..."
                        className="h-9"
                      />
                      <CommandEmpty>No services found.</CommandEmpty>
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

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-6">
          <h1 className="text-xl mt-4">Add your Main Profession?</h1>
          <div className="mt-4">
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn("rounded-full")}
                      placeholder="Software Engineer |Javascript | OS"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Title must have at least 4 letters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}></FormField>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProfileBio;
