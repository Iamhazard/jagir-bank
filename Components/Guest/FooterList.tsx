"use client";
import React, { useState } from "react";

interface FooterListProps {
  list: {
    title: string;
    links: string[];
  };
  i: number;
}

const FooterList: React.FC<FooterListProps> = ({ list, i }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      key={i}
      className="mb-4 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}>
      <div className="border-b border-twilight flex justify-between items-center md:border-none">
        <h3 className="py-3 font-bold uppercase text-sm">{list.title}</h3>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
      <ul className={`${isOpen ? "" : "hidden"} md:hidden`}>
        {list.links.map((link, j) => (
          <li key={j} className="mt-3 text-sm cursor-pointer">
            {link}
          </li>
        ))}
      </ul>

      {/* desktop version */}
      <ul className="hidden md:block">
        {list.links.map((link, k) => (
          <li key={k} className="mt-3 text-sm cursor-pointer">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterList;
