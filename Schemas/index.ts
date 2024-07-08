import jobType from "@/Redux/Features/admin/jobType";
import {  UserRole } from "@prisma/client";
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




const RateSchema=z.object({
  from:z.string().regex(amountRegex,"fixed  must be a positive number"),
  to:z.string().regex(amountRegex,"fixed  must be a positive number"),
})



export const OrganizationSchema=z.object({
  organization:z.string(),

})
export const EducationSchema=z.object({
  name:z.string(),

})



export const ClientSchema = z.object({
  country:z.string().optional(),
   jobs: z.array(z.object({
    organization:z.string(),
    post: z.string().min(1, 'Post is required'),
  projectSize: z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  duration: z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  expertise: z.string().min(1, { message: "Please select a value" }).max(260, { message: "The name is too long" }),
  from: z.string().regex(amountRegex, "Fixed must be a positive number").optional(),
  to: z.string().regex(amountRegex, "Fixed must be a positive number").optional(),
  fixed: z.string().regex(amountRegex, "Fixed must be a positive number").optional(),
  jobDescription: z.string().min(60, 'Minimum 60 words are required'),
  education: z.string().optional(),
   jobType: z.string().min(1, 'Job type is required'),
  skills:z.array(z.object({
    skill:z.string().min(1),
   })),
  
  }),) 
});
;


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
   skill: z.string().min(2, {
    message: "profession must be at least 2 characters.",
  }),
  professionId:z.string().optional(),
  
})

export const SalarySchema = z.object({
  salary: z.string(),
  
})


export const CitySchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
   countryId:z.string().optional(),
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
 
   cityname: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  
});

export const freelanceSchema=z.object({
  profession: z.string().min(2, {
    message: "profession must be at least 2 characters.",
  }),
  
})

export const SkillsFreelancer = z.object({
   skill: z.string().min(2, {
    message: "profession must be at least 2 characters.",
  }),
  
  
})
export const FreeLancerSchema=z.object({
  name:z.string(),
  countries:z.array(z.object({
country:z.array(z.object({
   countryname:z.string().min(1),
   })),
 city:z.array(z.object({
    cityname:z.string().min(1),
   })),
})),
  address: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
   contact: z.string().regex(phoneRegex,'Invalid Number!'),
    Statename: z.string().min(2, {
    message: "State Name must be at least 2 characters.",
  }),
  zip: z.string().regex(phoneRegex,'Invalid Number!'),
   hourlyrate: z.string().regex(amountRegex,"Hourly rate must be a positive number"),
estimatedamount:z.string().regex(amountRegex,"estimatedamount  must be a positive number"),
message: z.string().min(10, 'minium 10 words  is required'),
category:z.array(z.object({
professions:z.array(z.object({
    profession:z.string().min(1),
   })),
 skills:z.array(z.object({
    skill:z.string().min(1),
   })),
})),
  language: z.string().min(2, {
    message: "State Name must be at least 2 characters.",
  }),
 

})