'use client'
import { Profession } from '@/@types/enum'
import React, { useEffect, useState } from 'react'
export interface Education {

  id: string;
  name: string;
}

const GetEducation = ({ id }: any) => {
  const [educations, setEducations] = useState<Education[]>([])
  useEffect(() => {
    fetchEducations()

  }, [])

  const fetchEducations = async () => {
    try {
      const reponse = await fetch('/api/job/Education/getEducation', {
        method: 'GET',
      })
      const data = await reponse.json()
      //console.log("datafrom response", data)
      setEducations(data)
    } catch (error) {
      console.log(error)

    }
  }
  return (
    <div>
      <select
        id={id}

        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select a Education</option>
        {educations.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}

          </option>
        ))}
      </select>
    </div>
  )
}

export default GetEducation