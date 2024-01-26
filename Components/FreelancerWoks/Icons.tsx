"use client";

import { Button } from "../ui/button";
import { FaRegHeart } from "react-icons/fa";

export const SocailIcon = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Button
        className="w-full font-bold shadow-sm rounded-3xl py-2 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline "
        size="sm"
        variant="outline">
        <div className="bg-white p-1 rounded-full">
          <FaRegHeart />
        </div>
      </Button>
    </div>
  );
};
