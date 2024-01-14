"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import styles from "../../styles/styles.module.css";
import Link from "next/link";

import Image from "next/image";

import { NAV_LINKS } from "@/lib/Navlinks";
import { useRouter } from "next/navigation";
import LoginButton from "../auth/login-button";
import { Button } from "../ui/button";
import SearchFrom from "./SearchForm";

const NavBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const router = useRouter();
  const Onclick = () => {
    console.log("Button clicked");
    router.push("/auth/login");
  };

  const handleToggleDropdown = () => {
    setDropDownMenu(!dropDownMenu);
  };

  const handleNavbarHover = () => {
    setIsHovered(true);
    console.log("hover");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const signUp = () => {};
  return (
    <section className="border-b border-gray-300 mb-3 sticky top-0 bg-white z-50">
      <div className="container">
        <div className="px-3 flex items-center justify-between h-16">
          {/*mbl nav icon */}
          <div className="flex items-center">
            <button
              onClick={handleToggleDropdown}
              aria-controls="mobile-menu"
              aria-expanded="false"
              className="navbar-burger flex items-center text-blue-600 p-3 lg:hidden">
              <Image
                src="/assets/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="inline-block cursor-pointer lg:hidden"
              />
            </button>

            <Link href="/">
              <img src="/assets/logo.svg" alt="logo" className={styles.logo} />
            </Link>

            {/* desktop*/}
            <div className="hidden lg:block  mx-16 text-gray-800">
              <ul className="flex space-x-10">
                {NAV_LINKS.map((link, N) => (
                  <li
                    className={`${styles.nav_items} items-center cursor-pointer  transition-none hover:text-green-600 `}
                    key={N}>
                    <Link
                      onMouseEnter={handleNavbarHover}
                      onMouseLeave={handleMouseLeave}
                      href={link.href}>
                      {link.label}
                    </Link>
                    {link.icon && <>{link.icon}</>}
                  </li>
                ))}
              </ul>
            </div>
            {/*Search */}
            <div className="p-12 relative my-auto hidden xl:block">
              <SearchFrom />
            </div>
          </div>
          <div className="hidden lg:block ">
            <div className="flex space-x-4">
              <Link href="/auth/login">
                {" "}
                <button>Login</button>
              </Link>
              <LoginButton mode="modal" asChild>
                <Button variant="btn_green" size="lg">
                  sign up
                </Button>
              </LoginButton>
            </div>
          </div>
          <div className="lg:hidden">
            <ul className="flex space-x-4 text-sm">
              <li>
                <Link href="/login">
                  <p>Log In</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* mbl */}
        {dropDownMenu ? (
          <div className="fixed w-full h-full lg:hidden bg-white z-50 ">
            <div className="flex flex-col justify-between ">
              <div className="p-3 relative mb-4 mt-2">
                <SearchFrom />
              </div>
              <ul className="space-y-8 font-bold p-3 mb-4">
                {NAV_LINKS.map((link, N) => (
                  <li
                    className={`${styles.nav_items} items-center cursor-pointer  transition-none hover:text-green-600 `}
                    key={N}>
                    <Link href={link.href}>{link.label}</Link>
                    {link.icon && <>{link.icon}</>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16">
              <Link href="">
                <button className="w-full bg-primary-green text-black font-bold rounded-lg my-4 py-2">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default NavBar;
