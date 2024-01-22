"use client";
import { useState } from "react";

const SearchFrom = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("project");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    console.log(`Searching for ${searchQuery} in ${selectedCategory}`);
  };

  return (
    <div className="flex">
      <div className="relative flex-grow items-center">
        <input
          className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-[2px] border-gray-500 border-s-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search.."
        />
        <div className="absolute right-2 top-2 flex items-center">
          <select
            className="inline-flex px-1 rounded-2xl py-1  border-[2px] border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onChange={(e) => handleCategoryChange(e.target.value)}
            onClick={handleSearch}
            value={selectedCategory}>
            <option value="project">Project</option>
            <option value="talent">Talent</option>
            <option value="job">Job</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFrom;
