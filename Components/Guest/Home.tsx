"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import styles from "../../styles/main.module.css";
//import CardSection from "./CardSection";
import { useRouter } from "next/navigation";
import TopSection from "./TopSection";
import Animation from "./Animation";
import CardSection from "./CardSection";
import LoginButton from "../auth/login-button";
import { Button } from "../ui/button";

const Landing = () => {
  const router = useRouter();

  return (
    <>
      <TopSection />
      <div className="container mx-auto">
        <div className="md:grid s grid-cols-12">
          <div className=" max-w-md md:max-w-full mx-auto md:mx-0 col-start-1 col-end-8 row-start-1 row-end-4 z-10 relative">
            <h1 className={`${styles.heading} p-4 sm:text-2xl`}>
              How Work
              <br />
              Should Work
            </h1>
            <p
              className={`${styles.heading_p}my-4 p-4 md:my-12 md:text-lg lg:text-xl`}>
              Forget the old rules. You can have the best people.
              <br />
              Right now. Right here.
            </p>

            <div className="flex space-x-4 md:max-w-xs">
              <LoginButton mode="modal" asChild>
                <Button variant="btn_green" size="default">
                  Get Started
                </Button>
              </LoginButton>
            </div>
            <div className="mt-10">
              <h1 className=" text-green-600  text-lg leading-tight">
                Trusted By
              </h1>
              <div className="flex flex-wrap">Nepal</div>
            </div>
          </div>

          <div className=" lg:block hidden  grid-rows-7  col-start-7 col-end-13 row-start-1 row-end-7">
            <Animation />
          </div>
        </div>
        <div className="flex flex-col ">
          {" "}
          <CardSection />{" "}
        </div>
      </div>
    </>
  );
};

export default Landing;
