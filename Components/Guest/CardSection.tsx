/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../styles/main.module.css";
import Link from "next/link";
import Image from "next/image";
const CardSection = () => {
  return (
    <>
      <div className=" flex max-w-70 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className=" mx-4 max-w-70 mt-6 h-100 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#70e4ce] to-[#cf9dbb]">
          <div className="flex ml-3 pt-10">
            <button
              data-ripple-light="true"
              type="button"
              className="select-none rounded-lg bg-blue-500 py-3 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Beta
            </button>
          </div>
          <h1 className={styles.heading_cards}>Get instant answers to</h1>
          <h1 className={styles.heading_cards}>your questions</h1>
          <Link href="/">
            <Image
              src="/assets/jb.svg"
              alt=""
              height={100}
              width={100}
              className="mt-4 object-cover ml-8"
            />
          </Link>
          <p className="ml-24">
            Start a conversation powered by OpenAI technologies.
          </p>
        </div>
        <div className="p-10">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            <div className={styles.Aicard}>
              <p>
                Hi 👋 I m here to help you up your work game with a little help
                from AI.
              </p>
            </div>
          </h5>
        </div>
      </div>
    </>
  );
};

export default CardSection;
