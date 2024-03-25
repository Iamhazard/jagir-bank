'use client'
import JobSheet, { JobSheetProps } from "@/Components/FreelancerWoks/jobsSheet";
import React, { useEffect, useState } from "react";



const BestmatchesPage = () => {
  const [jobs, setJob] = useState<JobSheetProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {

        const response = await fetch(`/api/job`);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    };


    fetchJobs();
  }, []);



  //console.log("jib0", { jobs })
  return (
    <div className="mt-4">
      {jobs.map((job, inx) => (
        <div key={inx}>
          <JobSheet id={job?.id || ""} title={job?.post || ""} jobdescription={job?.jobDescription || ""} duration={job?.duration || ""} expertise={job?.expertise || ""} projectSize={job?.projectSize || ""} fixed={job?.fixed || ""} Place={""} from={job?.from || ""} to={job?.to || ""} skills={job.skills} post={""} jobDescription={""} createdAt={job?.createdAt} country={""} />
        </div>
      ))}

    </div>
  );
};

export default BestmatchesPage;
