import { UserRole } from "@prisma/client";
import * as z from "zod";


export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    lastName: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.Client, UserRole.Freelancer]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minium 6 character required" }),
  name: z.string().min(1, { message: "Name  is required" }),
  lastName: z.string().min(1, { message: "Last Name  is required" }),
});
export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minium 6 character required" }),
});



const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/ 
);
const amountRegex = /^[0-9]*\.?[0-9]+$/;


export const FormDataSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  contact: z.string().regex(phoneRegex,'Invalid Number!'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
   hourlyrate: z.string().regex(amountRegex,"Hourly rate must be a positive number"),
  estimatedamount:z.string().regex(amountRegex,"estimatedamount  must be a positive number"),
  message: z.string().min(10, 'minium 10 words  is required'),
  program: z.string().min(1, 'program is required'),
  profession: z.string().min(1, 'profession is required'),
  language: z.string().min(1, 'language is required'),
});

const skillsSchema = z.object({
  skills1: z.string(),
  skills2: z.string(),
  skills3: z.string(),
});

const RateSchema=z.object({
  from:z.string().regex(amountRegex,"fixed  must be a positive number"),
  to:z.string().regex(amountRegex,"fixed  must be a positive number"),
})

export const ClientSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  post: z.string().min(1, 'post is required'),
  skills1: z.string(),
  skills2: z.string(),
  skills3: z.string(),
  projectSize:z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  duration:z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  expertise:z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  
 from:z.string().regex(amountRegex,"fixed  must be a positive number"),
  to:z.string().regex(amountRegex,"fixed  must be a positive number"),
  fixed:z.string().regex(amountRegex,"fixed  must be a positive number"),
  jobDescription:z.string().min(60, 'minium 60 words  is required'),
});

