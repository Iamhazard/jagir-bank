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
    <div>
      <h1>help</h1>
    </div>
  );
};

export default JobRequired;
