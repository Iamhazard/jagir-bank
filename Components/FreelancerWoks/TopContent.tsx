import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const TopContent = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);

    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-[952px]">
      <h1 className="text-3xl font-sans font-extrabold py-4 right-0 ">
        Hi {session?.user.name}! 👋
      </h1>
      <div className="flex">
        <form className="w-[952px]">
          <input
            type="search"
            className="w-full p-2  ps-10 text-sm text-gray-900 border rounded-3xl border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for jobs..."
            required
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleSearch}>Search</button>
        </form>
      </div>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.post}</li>

        ))}
      </ul>
      <h1 className="text-2xl font-serif font-semibold py-4">
        Jobs recommended for you
      </h1>
    </div>
  );
};

export default TopContent;
