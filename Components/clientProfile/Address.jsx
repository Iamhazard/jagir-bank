/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useFormContext } from "react-hook-form";

const Address = () => {
  const { register } = useFormContext();
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Job Title
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        This helps your job post stand out the right candidate.it's the first
        thing they'll see make it count.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor="post"
            className="block text-sm font-medium leading-6 text-gray-900">
            Write a tittle for your job post
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="post"
              {...register("jobs.post.0")}
              autoComplete="web"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            <span>
              <p className="text-sm py-4">Examples</p>
              <small className="text-gray-500">
                <li>
                  Build responsive WordPress site with booking/payment
                  functionality
                </li>
                <li>AR experience needed for virtual product demos (ARCore)</li>
                <li>
                  Developer needed to update Android app UI for new OS/device
                  specs
                </li>
              </small>
            </span>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-900">
            Country
          </label>
          <div className="mt-2">
            <select
              id="country"
              autoComplete="country-name"
              {...register("country")}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option>Nepal</option>
              <option>India</option>
              <option>China</option>
              <option>Srilanka</option>
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
              <option>Austraia</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
