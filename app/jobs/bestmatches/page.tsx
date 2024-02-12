
import JobSheet from "@/Components/FreelancerWoks/jobsSheet";
import { db } from "@/lib/db";
import React from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const BestmatchesPage = async () => {

  const jobs = await prisma.job.findMany();
  //console.log("jib0", jobs)
  return (
    <div className="mt-4">
      {jobs.map((job) => (
        <div key={job.id}>
          <JobSheet id={0} title={job?.post || ""} jobdescription={job?.jobDescription || ""} />
        </div>
      ))}

    </div>
  );
};

export default BestmatchesPage;
