"use client";
import { FormFieldProps } from "@/@types/enum";
import React, { ChangeEvent, useState } from "react";

interface Service {
  service: string;
  [key: string]: string;
}

const FormFields: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => {
  const [serviceList, setServiceList] = useState<Service[]>([{ service: "" }]);

  const handleServiceChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };
  const handleServiceRemove = (index: number) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  return (
    <>
      <div className="col-span-1/2">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900">
          {placeholder}
        </label>
        {serviceList.map((singleService, index) => (
          <div className="mt-1" key={index}>
            <div className="space-x-4">
              <input
                type={type}
                {...register(name, { valueAsNumber })}
                onChange={(e) => handleServiceChange(e, index)}
                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              {serviceList.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className=" text-black hover:bg-gray-300 p-2 rounded-md border-[2px]">
                  Remove
                </button>
              )}
            </div>
            {serviceList.length - 1 === index && serviceList.length < 4 && (
              <button
                type="button"
                onClick={handleServiceAdd}
                className="bg-Green hover:bg-blue-700  text-white font-bold py-2 px-4 rounded mt-3">
                add
              </button>
            )}

            {error?.name && <span className="">Please enter Skills</span>}
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-xl">Popular skills are</h1>
      </div>
    </>
  );
};

export default FormFields;
