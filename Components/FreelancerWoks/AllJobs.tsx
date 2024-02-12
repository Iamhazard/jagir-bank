import React from 'react'
import Jobs from './Jobs'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Alljobs = async () => {
    const alljobs = await prisma.job.findMany();
    ///////console.log("all jobs", alljobs)
    return (
        <div>
            {alljobs.map((alljob) => (

                <Jobs key={alljob.id} id={alljob?.id} title={alljob?.post || ""} jobsbudget={''} jobsdescription={''} Place={''} />

            ))}

        </div>
    )
}

export default Alljobs