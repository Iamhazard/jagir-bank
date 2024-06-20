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
  role: z.enum([UserRole.ADMIN, UserRole.Client, UserRole.Freelancer]),
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


// export const FormDataSchema = z.object({
//   country: z.string().min(1, 'Country is required'),
//   street: z.string().min(1, 'Street is required'),
//   contact: z.string().regex(phoneRegex,'Invalid Number!'),
//   city: z.string().min(1, 'City is required'),
//   state: z.string().min(1, 'State is required'),
//   zip: z.string().min(1, 'Zip is required'),
//    hourlyrate: z.string().regex(amountRegex,"Hourly rate must be a positive number"),
//   estimatedamount:z.string().regex(amountRegex,"estimatedamount  must be a positive number"),
//   message: z.string().min(10, 'minium 10 words  is required'),
//   program: z.string().min(1, 'program is required'),
//   profession: z.string().min(1, 'profession is required'),
//   language: z.string().min(1, 'language is required'),
// });

// const skillsSchema = z.object({
//   skills1: z.string(),
//   skills2: z.string(),
//   skills3: z.string(),
// });

const RateSchema=z.object({
  from:z.string().regex(amountRegex,"fixed  must be a positive number"),
  to:z.string().regex(amountRegex,"fixed  must be a positive number"),
})



export const ClientSchema = z.object({
   country: z.string().min(1, 'Country is required'),
   jobs: z.array(z.object({
    post: z.string().min(1, 'Post is required'),
  projectSize: z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  duration: z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  expertise: z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  from: z.string().regex(amountRegex, "Fixed must be a positive number"),
  to: z.string().regex(amountRegex, "Fixed must be a positive number"),
  fixed: z.string().regex(amountRegex, "Fixed must be a positive number"),
  jobDescription: z.string().min(60, 'Minimum 60 words are required'),
  skills:z.array(z.object({
    skill:z.string().min(1),
   })),
  }),) 
});

// export const ClientSchema = z.object({
//   country: z.string().min(1, 'Country is required'),
//   post: z.string().min(1, 'post is required'),
//   skills1: z.string(),
//   skills2: z.string(),
//   skills3: z.string(),
//   projectSize:z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
//   duration:z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
//   expertise:z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  
//  from:z.string().regex(amountRegex,"fixed  must be a positive number"),
//   to:z.string().regex(amountRegex,"fixed  must be a positive number"),
//   fixed:z.string().regex(amountRegex,"fixed  must be a positive number"),
//   jobDescription:z.string().min(60, 'minium 60 words  is required'),
// });


export const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  isUserMessage: z.boolean(),
})

// array validator
export const MessageArraySchema = z.array(MessageSchema)

export type Message = z.infer<typeof MessageSchema>



export const CategorySchema = z.object({
  title: z.string(),
  
})

export const ProfessionSchema=z.object({
  profession: z.string().min(2, {
    message: "profession must be at least 2 characters.",
  }),
  categoryId:z.string().optional(),
})

export const ProfileSchema = z.object({
  name: z.string(),
  
})

export const SkillsSchema = z.object({
  skill: z.string(),
  
})

export const SalarySchema = z.object({
  salary: z.string(),
  
})


export const CitySchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
})

export const StateSchema = z.object({
  name: z.string().min(2, {
    message: "State Name must be at least 2 characters.",
  }),
})

export const StreetSchema = z.object({
  address: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})


const CountrySchema = z.object({
  name: z.string().min(2, { message: "Country name must be at least 2 characters." }),
  zip: z.string(),
    Statename: z.string().min(2, {
    message: "State Name must be at least 2 characters.",
  }),
   cityname: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const FreeLancerSchema=z.object({
  name:z.string(),
 country:z.array(CountrySchema),
   profession: z.array(ProfessionSchema),
   contact: z.string().regex(phoneRegex,'Invalid Number!'),
   hourlyrate: z.string().regex(amountRegex,"Hourly rate must be a positive number"),
estimatedamount:z.string().regex(amountRegex,"estimatedamount  must be a positive number"),
message: z.string().min(10, 'minium 10 words  is required'),
  skills:z.array(SkillsSchema),
  language: z.string().min(2, {
    message: "State Name must be at least 2 characters.",
  }),
  experiencefile: z.string().optional(),
  educationfile: z.string().optional(),
  imageInput: z.string().optional(),

})