'use client'
import { Job } from "@/@types/enum";
import JobSheet, { JobSheetProps } from "@/Components/FreelancerWoks/jobsSheet";
import { getAllJobs } from "@/Redux/Features/JobSlice";
import { AppDispatch } from "@/Redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";



const BestmatchesPage = () => {
  const [jobs, setJob] = useState<JobSheetProps[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {

  //       const response = await fetch(`/api/job`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch jobs');
  //       }
  //       const data = await response.json();
  //       setJob(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error)
  //       setLoading(false);
  //     }
  //   };


  //   fetchJobs();
  // }, []);


  //const [alljobs, setAllJobs] = useState<Job>()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(getAllJobs()).then((res: any) => {
        if (res.payload) {
          setJob(res.payload)
        }
      })

    } catch (error) {
      console.log(error)
    }


  }, [dispatch])

  // console.log("all jobs", jobs)
  //console.log("jib0", { jobs })
  return (
    <div>


      <div className="mt-4">
        {jobs.map((job, inx) => (
          <div key={inx} className="">
            <JobSheet id={job?.id || ""} title={job?.post || ""} jobdescription={job?.jobDescription || ""} duration={job?.duration || ""} expertise={job?.expertise || ""} projectSize={job?.projectSize || ""} fixed={job?.fixed || ""} Place={""} from={job?.from || ""} to={job?.to || ""} skills={job.skills} post={""} jobDescription={""} createdAt={job?.createdAt} country={""} />
          </div>
        ))}

      </div>
    </div>
  );
};

export default BestmatchesPage;
