import React from "react";
import { useFormContext } from "react-hook-form";

const Address = () => {
  const { register } = useFormContext();
  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Address
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Address where you can receive mail.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
            {/* {errors.country?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.country.message}
              </p>
            )} */}
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="street"
            className="block text-sm font-medium leading-6 text-gray-900">
            Street address
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="street"
              {...register("street")}
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.street?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.street.message}
              </p>
            )} */}
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900">
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="city"
              {...register("city", { required: "City is required" })}
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.city?.message && (
              <p className="mt-2 text-sm text-red-400">{errors.city.message}</p>
            )} */}
          </div>
        </div>
        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor="contact"
            className="block text-sm font-medium leading-6 text-gray-900">
            Contact Number
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="contact"
              {...register("contact", { required: "contact is required" })}
              autoComplete="9860"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.contact?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.contact.message}
              </p>
            )} */}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="state"
            className="block text-sm font-medium leading-6 text-gray-900">
            State / Province
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="state"
              {...register("state")}
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.state?.message && (
              <p className="mt-2 text-sm text-red-400">
                {errors.state.message}
              </p>
            )} */}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="zip"
            className="block text-sm font-medium leading-6 text-gray-900">
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="zip"
              {...register("zip")}
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.zip?.message && (
              <p className="mt-2 text-sm text-red-400">{errors.zip.message}</p>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
