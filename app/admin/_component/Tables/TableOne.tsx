'use client'
import { useEffect, useState } from "react";
import axios from "axios";
interface Job {
  id: string;
  post: string;
  projectSize: string;
  from: string;
  to: string;
}

interface Category {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface JobView {
  browserName: string;
  category: Category;
  categoryId: string;
  createdAt: string;
  device: string;
  id: string;
  job: Job;
  jobId: string;
  userAgent: string;
  viewCount: number;
}

interface MappedJobView {
  title: string;
  jobCount: number;
  visitor: string;
  device: string;
  successRate: string;
}

const TableOne = () => {
  const [categories, setCategories] = useState<MappedJobView[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<JobView[]>(`/api/job/Jobview`);
        const mappedData: MappedJobView[] = response.data.map((item) => ({
          title: item.job.post,
          jobCount: item.viewCount,
          visitor: item.device,
          device: item.browserName,
          successRate: '2%'
        }));
        setCategories(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Jobs Post
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Title
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              No. of Jobs
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Visitor
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Browser
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Success Rate
            </h5>
          </div>
        </div>

        {categories.map((cat, inx) => (
          <div key={inx} className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{cat.title}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{cat.jobCount}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{cat.visitor}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{cat.device}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{cat.successRate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
