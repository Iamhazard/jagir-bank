"use client";
import Link from "next/link";
import styles from "../../styles/combined.module.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";

const GuestLogin = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const router = useRouter();
  const OnClientClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedOption("Client");
  };
  const OnFreeLanceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedOption("Freelancer");
  };

  const handleClick = () => {
    if (selectedOption === "Freelancer") {
      router.push("/auth/register/?type=Freelancer");
    } else {
      router.push("/auth/register/?type=Client");
    }
  };
  return (
    <Card className="w-[500px] h-[300px]  sm:min-w-[400px] shadow-md my-3 mx-2">
      <div className={styles.tools}>
        <h1 className="flex justify-center mt-4 ">
          Join as a client or freelancer
        </h1>
      </div>
      <div className="grid ml-6 items-center mt-2 grid-cols-1 gap-2 sm:grid-cols-2 ">
        <Card className="">
          <div
            onClick={OnClientClick}
            className=" py-2 px-2 nested-card group border-[2px] border-gray-100  gap-2 rounded-4xl shadow-md transition-all duration-300 ease-in-out hover:border-green-700">
            <label className="flex mb-8 cursor-pointer">
              <input type="checkbox" className="hidden" />
              <span className="w-6 h-6 border border-gray-700 rounded-full relative transition duration-300 group-hover:bg-green-600 checked:bg-green-600">
                <span className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition duration-300 group-hover:bg-green-500 checked:bg-green-500"></span>
              </span>
            </label>

            <span className=" mb-5 align-bottom mt-8 text-xl font-medium ">
              I’m a client, hiring for a project.
            </span>
          </div>
        </Card>
        <Card className="mr-3">
          <div
            onClick={OnFreeLanceClick}
            className="py-2 px-2  group  border-[2px]  border-gray-100  gap-2 rounded-4xl shadow-md transition-all duration-300 ease-in-out hover:border-green-700">
            <label className="flex mb-8  cursor-pointer">
              <input type="checkbox" className="hidden" />
              <span className="w-6 h-6  border  border-gray-700 rounded-full relative transition duration-300 group-hover:bg-green-700 checked:bg-green-600">
                <span className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition duration-300 group-hover:bg-green-500 checked:bg-green-500"></span>
              </span>
            </label>
            <span className="mb-5 align-bottom mt-8 text-xl font-medium ">
              I’m a freelancer, looking for work.
            </span>
          </div>
        </Card>
        <div className="">
          <button className={styles.btn} onClick={handleClick}>
            {selectedOption === "Client"
              ? "Sign up as Client"
              : selectedOption === "Freelancer"
              ? "Sign up as Freelancer"
              : "Create Account"}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <span className=" px-12 py-3">
          Already have an Account?
          <Link className="text-sm text-green-800" href="auth/login">
            Login
          </Link>
        </span>
      </div>
    </Card>
  );
};

export default GuestLogin;
