import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {

    if(req.method =='PATCH'){
        try {

           const {categoryId,category}= await req.json();

           const categoryCheck=await db.category.findUnique(
            {
                where:{
                    id:categoryId
                }
            }
           )
           if(!categoryCheck){
              return new NextResponse("Category not found", { status: 401 });
           }
            const updatedCategory=await db.category.update({
                where:{
                    id:categoryId
                },
                data:{
                    title:category
                }
            })
            return new Response(JSON.stringify(updatedCategory), { status: 201 });
        } catch (error) {
            
        }


}
}