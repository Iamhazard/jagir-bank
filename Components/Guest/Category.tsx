"use client";
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "../../styles/main.module.css";
import Link from "next/link";
import { Links } from "../../lib/MainLinks";

interface ImageLink {
  href: string;
  k: string;
  label: string;
  btn: string;
}
const Category = () => {
  const [skills] = useState<string[]>([
    "JavaScript  Developer",
    "Logo Designer",
    "Data Entry Specialists",
    "Video Editors",
    "Python Developer",
    "Graphic Designer",
    "Data Analyst",
    "Shopify Developer",
    "Ruby on Rails Developer",
    "Android Developer",
    "UI Designer",
    "Content Writer",
    "Copywriter",
    "Database Administrator",
    "Data Scientist",
    "Front-End Developer",
    "Wordpress Developer",
    "iOS Developer",
  ]);
  const imageLink: ImageLink[] = [
    {
      href: "/",
      k: "work",
      label: "Find a Job and Hire a pro",
      btn: "Talent MarketPlace",
    },
    {
      href: "/",
      k: "a",
      label: "Browse and buy Projects",
      btn: "Project Catalog",
    },
    {
      href: "/",
      k: "b",
      label: "Get advice from Expert",
      btn: "Consolations",
    },
  ];

  return (
    <section className="mt-12 container mx-auto px-3">
      <div className="max-w-sm  mx-auto md:max-w-full">
        <h1 className={styles.heading_cat}>Browse talent by Category</h1>
        <p className={`${styles.p_category} md:text-lg sm:p-6 mb-7`}>
          Looking for project?
          <Link href="/" className="text-green-600 underline">
            Browse jobs
          </Link>
        </p>
        {/*Types */}
        <div className="flex flex-wrap justify-center">
          {Links.map((index, i) => (
            <div
              key={i}
              className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 px-4 mb-8">
              <div className={`${styles.card} hover:bg-slate-500`}>
                <div className={styles.card_details}>
                  <h1 className={styles.left_text_title}>{index.label}</h1>
                  <p className={styles.text_body}>118 skills</p>
                </div>
                <button className={styles.card_button}>More info</button>
              </div>
            </div>
          ))}
        </div>
        {/*Image text */}
        <div className={styles.image_container}>
          <img src="/assets/category.jpg" alt="" className={styles.image} />

          <div className={styles.top_left}>
            <div>
              <span>For Clients</span>
              <h1 className={styles.left_h1}> Find talent your way</h1>
              <p className={styles.left_p}>
                Work with the largest network of independent professionals and
                get things done—from quick turnarounds to big transformations.
              </p>
            </div>
            <div className="flex flex-wrap -mx-4">
              {imageLink.map((image, i) => (
                <div
                  key={i}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-8">
                  <div className=" border-b w-full p-5 bg-[#f5f5f5] rounded-md mt-8 ml-7">
                    <div className={styles.card_details}>
                      <h1 className={styles.text_title}>{image.label}</h1>
                    </div>
                    <button className={styles.card_button}>{image.btn}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-3xl">
          <h5 className="text-gray-500 font-extrabold uppercase tracking-widest text-xs text-center mt-16 mb-6">
            Top skills
          </h5>
          <div className="skills flex flex-wrap space-x-3 items-center justify-center ">
            {skills.map((skill, s) => (
              <span
                key={s}
                className="px-2 py-1 mb-2 border border-complementary text-complementary rounded-full hover:bg-complementary hover:text-green-800 cursor-pointer">
                {skill}
              </span>
            ))}
            <button className="text-primary font-bold pb-2">See more</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
