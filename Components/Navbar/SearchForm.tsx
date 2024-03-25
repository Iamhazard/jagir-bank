"use client";
import getUsers from "@/actions/getUser";
import axios from "axios";
import { useEffect, useState } from "react";

const SearchFrom = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("project");
  const [searchResults, setSearchResults] = useState([]);
  const [initialData, setInitialData] = useState([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };






  return (
    <div className="flex">
      <div className="relative flex-grow items-center">
        <input
          className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 border-s-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}

          placeholder="Search.."
        />
        <div className="absolute right-2 top-2 flex items-center">
          <select
            className="inline-flex px-1 rounded-2xl py-1  border  border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onChange={(e) => handleCategoryChange(e.target.value)}

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
