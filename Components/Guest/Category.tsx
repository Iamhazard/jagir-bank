"use client";
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "../../styles/main.module.css";
import Link from "next/link";
import clsx from "clsx";
import axios from "axios";
import Rating from "../FreelancerWoks/Rating";

interface ImageLink {
  href: string;
  k: string;
  label: string;
  btn: string;
}

interface Skill {
  id: string;
  title: string;
}

interface Profession {
  id: string;
  profession: string;
  categoryId: string;
  skills: Skill[];
}

interface Category {
  id: string;
  title: string;
  description: string;
  professions: Profession[];
}
interface CategoryWithSkills extends Category {
  totalSkills: number;
}
const Category = () => {

  const imageLink: ImageLink[] = [
    {
      href: "/jobs/bestmatches",
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
  const [categories, setCategories] = useState<CategoryWithSkills[]>([]);
  const [topSkills, setTopSkills] = useState<Skill[]>([]);
  const [rating, setRating] = useState<number>(0);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/getcategory");
        const categoriesData = response.data;

        // Sort categories by total number of skills and limit to 6 categories
        const sortedCategories = categoriesData
          .map((category: Category) => ({
            ...category,
            totalSkills: category.professions.reduce(
              (acc, profession) => acc + profession.skills.length,
              0
            ),
          }))
          .sort((a: { totalSkills: number; }, b: { totalSkills: number; }) => b.totalSkills - a.totalSkills)
          .slice(0, 6);

        setCategories(sortedCategories);

        // Aggregate and limit to 20 skills from the top 6 categories
        const aggregatedSkills = sortedCategories
          .flatMap((category: { professions: { skills: any; }[]; }) =>
            category.professions.flatMap((profession: { skills: any; }) => profession.skills)
          )
          .slice(0, 20);

        setTopSkills(aggregatedSkills);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);



  return (
    <section className="mt-12 max-w-[1400px]  mx-auto px-3">
      <div className="max-w-sm  mx-auto md:max-w-full">
        <h1 className={styles.heading_cat}>Browse talent by Category</h1>
        <p className={`${styles.p_category} md:text-lg sm:p-6 mb-7`}>
          Looking for project?
          <Link href="/jobs/bestmatches" className="text-green-600 underline">
            Browse jobs
          </Link>
        </p>
        {/*Types */}
        <div className="flex flex-wrap justify-center">
          {categories.map((category, i) => (
            <div
              key={i}
              className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 px-4 mb-8">
              <div className={`${styles.card} hover:bg-slate-500`}>
                <div className={styles.card_details}>


                  <h1 className={styles.left_text_title}>{category.title}</h1>
                  <p className={styles.text_body}> {category.totalSkills} skills</p>
                </div>
                <Link href='/jobs/bestmatches'> <button className={styles.card_button}>More info</button></Link>
                <Rating initialRating={0} />
              </div>
            </div>
          ))}
        </div>
        {/*Image text */}
        <div className={styles.image_container}>
          <div className={clsx("py-6 px-4 sm:px-6 md:px-8", styles.top_left)}>
            <div>
              <span>For Clients</span>
              <h1 className={styles.left_h1}> Find talent your way</h1>
              <p className=" text-xl font-medium  sm:py-2 ">
                Work with the largest network of independent professionals and
                get things done from quick turnarounds to big transformations.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 items-center mt-5">
              {imageLink.map((image, i) => (
                <Link key={i} href={image.href} className="w-full md:w-fit">
                  <button className="w-full p-4 bg-[#f5f5f5] rounded-md text-black hover:bg-green-600 ">
                    {image.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <h5 className="text-gray-500 font-extrabold uppercase tracking-widest text-xs text-center mt-16 mb-6">
            Top skills
          </h5>
          <div className="skills flex flex-wrap space-x-3 items-center justify-center ">
            {topSkills.map((skill, s) => (
              <>
                <span
                  key={skill.id}
                  className="px-2 py-1 mb-2 border border-complementary text-complementary rounded-full hover:bg-complementary hover:text-green-800 cursor-pointer">
                  {skill.title}
                </span>

              </>


            ))}
            <button className="text-primary font-bold pb-2">See more</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
