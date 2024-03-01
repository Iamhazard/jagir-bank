'use client'
import { JobSheetProps } from '@/Components/FreelancerWoks/jobsSheet';
import ProposalForm from '@/app/jobs/_components/ProposalForm'
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface IParams {
    jobId?: string;
}

const Page = ({ params }: { params: IParams }) => {
    const [jobs, setJob] = useState<JobSheetProps[]>([]);
    const [loading, setLoading] = useState(true);
    const jobId = params.jobId
    console.log(jobId)
    useEffect(() => {
        if (!jobId) {
            console.error('Job ID is null or undefined');
            return;
        }
        console.log('Fetching job with ID:', jobId);
        try {
            const fetchJobs = async () => {
                try {

                    const response = await fetch(`/api/job/${jobId}`);
                    console.log("response", response)
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
        } catch (error) {
            console.log(error)
        }



    }, [jobId]);
    console.log({ jobs })
    return (
        <div>

            <div>
                <ProposalForm id={jobs?.id || ""} title={jobs?.post || ""} jobdescription={job?.jobDescription || ""} duration={job?.duration || ""} expertise={job?.expertise || ""} projectSize={job?.projectSize || ""} fixed={job?.fixed || ""} Place={""} from={job?.from || ""} to={job?.to || ""} skills={job.skills} post={""} jobDescription={""} createdAt={job?.createdAt} country={""} />
            </div>

        </div>
        //<ProposalForm id={jobs.id} title={jobs.post} country={''} duration={} expertise={''} projectSize={''} fixed={''} Place={''} from={''} to={''} post={''} jobDescription={''} createdAt={''} skills={[]} />
    )
}

export default Page