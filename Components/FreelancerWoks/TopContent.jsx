import React from "react";
import SearchFrom from "../Navbar/SearchForm";

const TopContent = () => {
  return (
    <>
      <h1 className="text-3xl font-sans font-extrabold py-4 right-0 ">
        Hi Name! {""}👋{" "}
      </h1>
      <div className="flex w-full ">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border-[2px] rounded-3xl border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for jobs..."
              required
            />
          </div>
        </form>
      </div>
      <h1 className="text-2xl font-serif font-semibold py-4">
        Jobs recommended for you
      </h1>
    </>
  );
};

export default TopContent;
