import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export interface Education {
  id: string;
  name: string;
}

const GetEducation = ({ id, register, name }: any) => {
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await fetch('/api/job/Education/getEducation', {
        method: 'GET',
      });
      const data = await response.json();
      setEducations(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <select
        id={id}
        {...register(name)}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select an Education</option>
        {educations.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GetEducation;
