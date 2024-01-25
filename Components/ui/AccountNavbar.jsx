"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "../../styles/main.module.css";
import { UserButton } from "../auth/user-button";
import LoginButton from "../auth/login-button";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const AccountNavbar = () => {
  const { data: session } = useSession();
  return (
    <section className="border-b border-gray-300 mb-3 sticky top-0 bg-white z-50">
      <div className="max-w-[1400px] mx-auto  flex items-center justify-between h-16">
        <div className="px-4">
          <Link href="/">
            <img src="/assets/logo.svg" alt="logo" className={styles.logo} />
          </Link>
        </div>

        <div className=" lg:block ">
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
      </div>
    </section>
  );
};

export default AccountNavbar;
