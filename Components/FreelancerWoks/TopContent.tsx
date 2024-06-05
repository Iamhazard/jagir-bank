/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SearchedJob from "./SearchedJob"; // Import the SearchedJob component

const TopContent = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      // Fetch jobs data
      const jobsResponse = await fetch('/api/job');
      if (!jobsResponse.ok) {
        throw new Error('Failed to fetch job');
      }
      const jobsData = await jobsResponse.json();

      const filteredJobs = jobsData.filter((job: any) =>
        job.post.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filteredJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full max-w-full lg:max-w-xl md:max-w-md px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold py-4">
        Hi {session?.user.name}! 👋
      </h1>
      <div className="flex justify-center">
        <form className="w-full max-w-lg">
          <input
            type="search"
            className="w-full p-2 ps-10 text-sm text-gray-900 border rounded-3xl border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for jobs..."
            required
            onChange={onSearchChange}
            value={searchTerm}
          />
        </form>
      </div>
      {loading && <p>Loading...</p>}
      {searchResults.length > 0 && (
        <>
          <h1 className="text-xl sm:text-2xl font-serif font-semibold py-4">
            Search Results
          </h1>
          <div>
            {searchResults.map((result) => (
              <SearchedJob
                key={result.id}
                id={result.id}
                title={result.post}
                jobdescription={result.jobDescription}
                from={result.from}
                to={result.to}
                duration={result.duration}
                expertise={result.expertise}
                projectSize={result.projectSize}
                fixed={result.fixed}
                skills={result.skills}
                createdAt={result.createdAt}
                country={result.country}
              />
            ))}
          </div>
        </>
      )}
      <h1 className="text-xl sm:text-2xl font-serif font-semibold py-4">
        Jobs recommended for you
      </h1>
    </div>

  );
};

export default TopContent;
