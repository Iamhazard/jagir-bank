'use server'
import { FormDataSchema } from "@/Schemas";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { z } from "zod";


export const freelancerProfile=async (values:z.infer<typeof FormDataSchema>)=>{

    const validatedFiled=FormDataSchema.safeParse(values);
     if(!validatedFiled.success){
        return {error:"invalid fields"}
        
     }

     const {id,country,street,contact,city,state,zip,hourlyrate,estimatedamount,message,program,profession,language}=validatedFiled.data;

     const user=await getUserById(id);

   if (!user) {
    return { error: "User not found" };
  }
try {
   if(user.id){
await db.freelancerProfile.create({
      data:{
         userId: user?.id,
           country,
            street,
            contact,
            city,
            state,
            zip,
            hourlyrate,
            estimatedamount,
            message,
            program,
            profession,
            language,
      }
     })
     return { success: true };
   }else{
      throw new Error("No id provided");
   }
   
} catch (error) {
   console.error("Error creating freelancer profile:", error);
    return { error: "Error creating freelancer profile" };
}
     

     

}