/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../styles/main.module.css";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import Chat from "../AIbot/Chat";
const CardSection = () => {
  return (
    <>
      <div className="flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-4">
        <div className=" mx-4 mt-6 h-100 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#70e4ce] to-[#cf9dbb]">
          <div className="flex justify-end py-4 px-4 md:px-6">
            <span className="select-none rounded-sm bg-blue-500 py-2px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Beta
            </span>
          </div>
          <h1
            className={clsx(
              " max-w-[600px] px-4 sm:px-6 md:px-8 lg:px-14 py-5 md:py-8",
              styles.heading_cards
            )}>
            Get instant answers to your questions
          </h1>
          <div className=" flex gap-2  items-center max-w-xl  sm:px-2 py-2">
            <Link href="/">
              <Image
                src="/assets/jb.svg"
                alt=""
                height={100}
                width={100}
                className=" object-cover"
              />
            </Link>
            <small className="text-sm font-mono">
              Start a conversation powered by OpenAI technologies.
            </small>
          </div>
        </div>
        <div className="p-4 flex justify-end">
          <Chat />
        </div>
      </div>
    </>
  );
};

export default CardSection;
