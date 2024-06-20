
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

interface IParams {
  categoryId?: string;
}
export  async function GET(req: NextRequest,{params}:{params:IParams}) {
  const { categoryId } =params;
  if (req.method === "GET") {
    try {
      const category = await db.category.findUnique({
        where: {
          id: categoryId
        },
       include:{professions:true}
      });
      if (!category) {
        return new Response("Category not found", { status: 404 });
      }
      return new Response(JSON.stringify(category), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  } else if(req.method =='PATCH'){
    const {title}=await req.json();

    const updateCaegory=await db.category.update({
      where:{
        id:categoryId
      },
      data:{title}
    })
return new Response(JSON.stringify(updateCaegory), { status: 200 });
     
  }else if(req.method === 'DELETE'){
    const deleteCategory=await db.category.delete({
      where:{id:categoryId}
    })
     return new Response(JSON.stringify(deleteCategory), { status: 200 });
  }else{
    return new Response("Method Not Allowed", { status: 405 });
  }
  
}
