
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

interface IParams {
  professionId?: string;
}
export  async function GET(req: NextRequest,{params}:{params:IParams}) {
  const { professionId } =params;
  if (req.method === "GET") {
    try {
      const profession = await db.profession.findUnique({
        where: {
          id: professionId
        },
       include:{category:true}
      });
      if (!profession) {
        return new Response("Profession not found", { status: 404 });
      }
      return new Response(JSON.stringify(profession), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  } else if(req.method =='PATCH'){
    const {profession}=await req.json();

    const updateprofession=await db.profession.update({
      where:{
        id:professionId
      },
      data:{profession}
    })
return new Response(JSON.stringify(updateprofession), { status: 200 });
     
  }else if(req.method === 'DELETE'){
    const deleteProfession=await db.profession.delete({
      where:{id:professionId}
    })
     return new Response(JSON.stringify(deleteProfession), { status: 200 });
  }else{
    return new Response("Method Not Allowed", { status: 405 });
  }
  
}
