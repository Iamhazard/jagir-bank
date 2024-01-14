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
      <input
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search.."
      />
      <button
        className="bg-green-300 border-green-700 border-b rounded-xl"
        onClick={handleSearch}>
        <select
          className="inline-flex px-4 rounded-2xl py-2 border-b-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory}>
          <option value="project">Project</option>
          <option value="talent">Talent</option>
          <option value="job">Job</option>
        </select>
      </button>
    </div>
  );
};

export default SearchFrom;
