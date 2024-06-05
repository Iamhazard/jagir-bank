/* eslint-disable @next/next/no-img-element */
import React from "react";
import { buttonVariants } from "../ui/button";
import { Progress } from "@/Components/ui/progress";
import Link from "next/link";
import { Card } from "../ui/card";

const Profile = () => {
  return (
    <Card className=" w-[250px] mb-6 ">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/assets/jb.svg"
          alt="user image"
        />
        <Link
          className={buttonVariants({
            variant: "link2",
            className: "gap-1.5",
          })}
          href="/freelancerProfile/viewprofile">
          Name
        </Link>

        <div className="flex  md:mt-6">
          <Link
            className={buttonVariants({
              variant: "link",
              className: "text-2xl ",
            })}
            href="/sign-in">
            Complete your Profile.
          </Link>
        </div>
      </div>
      <div className="py-4 px-8">
        <Progress value={33} />
      </div>
    </Card>
  );
};

export default Profile;
