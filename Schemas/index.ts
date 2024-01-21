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

export const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export const ProfileSchema = z.object({
  address: z.string().min(1, { message: "Street Address is required" }),
  country: z.string().min(1, { message: "Country Name is required" }),
  stateName: z.string().min(1, { message: "State Name  is required" }),
  cityName: z.string().min(1, { message: "City Name  is required" }),
  phoneNumber: z.number().min(10, { message: "Phone Number  is required" }),
  PostalCode: z.number().min(5, { message: "Phone Number  is required" }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),

  services: z.string({
    required_error: "Please select a language.",
  }),
  hourlyRate: z.number().int().nonnegative(),
  servicesFee: z.number().nonnegative(),
  estimatedAmount: z.number().int().nonnegative(),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),

  language: z.string().min(1).max(50),
});
