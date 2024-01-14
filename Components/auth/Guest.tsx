"use client";
import Link from "next/link";
import styles from "../../styles/combined.module.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GuestLogin = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const router = useRouter();
  const OnClientClick = (e) => {
    e.preventDefault();
    setSelectedOption("Client");
  };
  const OnFreeLanceClick = (e) => {
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
    <section className="mt-40  pb-10">
      <div className={styles.card}>
        <div className={styles.tools}>
          <h1 className="flex justify-center ">
            Join as a client or freelancer
          </h1>
        </div>
        <div className="grid ml-6 items-center mt-14 grid-cols-1 gap-2 sm:grid-cols-2 ">
          <div
            onClick={OnClientClick}
            className="h-36 w-60 py-2 px-2 nested-card group border-[2px] border-gray-100  gap-2 rounded-4xl shadow-md transition-all duration-300 ease-in-out hover:border-green-700">
            <label className="flex mb-8 cursor-pointer">
              <input type="checkbox" className="hidden" />
              <span className="w-6 h-6 border border-gray-700 rounded-full relative transition duration-300 group-hover:bg-green-600 checked:bg-green-600">
                <span className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition duration-300 group-hover:bg-green-500 checked:bg-green-500"></span>
              </span>
            </label>

            <span className=" mb-5 align-bottom mt-8 text-xl font-medium ">
              I’m a client, hiring for a project
            </span>
          </div>
          <div
            onClick={OnFreeLanceClick}
            className="h-36 w-60  py-2 px-2 nested-card group  border-[2px]  border-gray-100  gap-2 rounded-4xl shadow-md transition-all duration-300 ease-in-out hover:border-green-700">
            <label className="flex mb-8  cursor-pointer">
              <input type="checkbox" className="hidden" />
              <span className="w-6 h-6  border  border-gray-700 rounded-full relative transition duration-300 group-hover:bg-green-700 checked:bg-green-600">
                <span className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition duration-300 group-hover:bg-green-500 checked:bg-green-500"></span>
              </span>
            </label>
            <span className="mb-5 align-bottom mt-8 text-xl font-medium ">
              I’m a freelancer, looking for work
            </span>
          </div>
          <div>
            <button className={styles.btn} onClick={handleClick}>
              {selectedOption === "Client"
                ? "Login as Client"
                : selectedOption === "Freelancer"
                ? "Login as Freelancer"
                : "Create Account"}
            </button>

            <p className="justify-center">
              Already have an Account?{" "}
              <Link className="text-sm text-green-800" href="auth/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestLogin;
