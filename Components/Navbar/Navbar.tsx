"use client";
/* eslint-disable @next/next/no-img-element */
import React, { use, useState } from "react";

import styles from "../../styles/styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoginButton from "../auth/login-button";
import { Button } from "../ui/button";
import SearchFrom from "./SearchForm";
import { NavMenu } from "../auth/Navmenu";
import { UserButton } from "../auth/user-button";
import { IoIosHelpCircleOutline, IoIosNotifications } from "react-icons/io";
import { MdOutlineApps } from "react-icons/md";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const { data: session } = useSession();
  // console.log("session", session);

  const router = useRouter();
  const Onclick = () => {
    console.log("Button clicked");
    router.push("/auth/login");
  };

  const handleToggleDropdown = () => {
    setDropDownMenu(!dropDownMenu);
  };

  return (
    <section className="border-b border-gray-300 mb-3 sticky top-0 bg-white z-50">
      <div className="max-w-[1400px] mx-auto">
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
              <NavMenu />
            </div>
            {/*Search */}
            <div className="p-12 relative mx-auto hidden xl:block">
              <SearchFrom />
            </div>
          </div>
          <div className="flex space-x-6">
            {session?.user ? (
              <div className="gap-6 p-4 inline-flex justify-between">
                <span>
                  <IoIosHelpCircleOutline size={25} />
                </span>
                <span>
                  <MdOutlineApps size={25} />
                </span>
                <span>
                  <IoIosNotifications size={25} />
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="hidden lg:block ">
            <div className="flex space-x-4">
              {session?.user ? (
                <UserButton />
              ) : (
                <>
                  <Link href="/auth/login">
                    {" "}
                    <Button variant="btn_blue" size="lg">
                      Login
                    </Button>
                  </Link>
                  <LoginButton mode="modal" asChild>
                    <Button variant="btn_green" size="lg">
                      sign up
                    </Button>
                  </LoginButton>
                </>
              )}
            </div>
          </div>
          <div className="lg:hidden">
            {!session?.user ? (
              <ul className="flex space-x-4 text-sm">
                <li>
                  <Link href="/login">
                    <p>Log In</p>
                  </Link>
                </li>
              </ul>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* mbl */}
        {dropDownMenu ? (
          <div className="fixed w-full h-full lg:hidden bg-white z-50 ">
            <div className="flex flex-col justify-between ">
              <div className="p-3 relative mb-4 mt-2">
                <SearchFrom />
              </div>
              <div className="space-y-8 font-bold p-3 mb-4">
                <NavMenu />
              </div>
            </div>

            <div className="flex mx-auto items-center">
              <Link href="">
                <LoginButton mode="modal" asChild>
                  <Button variant="btn_green" size="lg">
                    sign up
                  </Button>
                </LoginButton>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default NavBar;
