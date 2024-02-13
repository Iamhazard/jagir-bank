import { useSession } from "next-auth/react";
import React from "react";

const TopContent = () => {
  const { data: session } = useSession()
  //console.log(session)
  return (
    <div className="w-[952px]">
      <h1 className="text-3xl font-sans font-extrabold py-4 right-0 ">
        Hi {session?.user.name}! {""}👋{" "}
      </h1>
      <div className="flex">
        <form className="w-[952px]">
          <input
            type="search"
            className="w-full p-2  ps-10 text-sm text-gray-900 border rounded-3xl border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for jobs..."
            required
          />
        </form>
      </div>
      <h1 className="text-2xl font-serif font-semibold py-4">
        Jobs recommended for you
      </h1>
    </div>
  );
};

export default TopContent;
