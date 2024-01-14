"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { Links, dropDown_Links } from "../../lib/MainLinks";

const TopSection = () => {
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    setDropDownMenu(!dropDownMenu);
  };

  const closeDropdown = () => {
    setDropDownMenu(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <section className="flex flex-col-reverse">
      <div className="flex items-center space-x-4  text-black p-4">
        <div className="flex space-x-5">
          {Links.map((items, l) => (
            <Link
              key={l}
              href={items.href}
              className="text-lg hover:text-green-600 hover:underline">
              {items.label}
            </Link>
          ))}
          <div className="relative">
            <button
              className="text-lg hover:text-green-600"
              onClick={toggleDropDown}>
              More
              <IoIosArrowDown width={12} height={11} />
            </button>
            <div
              ref={dropdownRef}
              className={`${
                dropDownMenu ? "block" : "hidden"
              } mt-2 bg-white border border-gray-300 rounded-md shadow-lg absolute right-0`}>
              {dropDown_Links.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800 dark:hover:bg-gray-700 dark:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
