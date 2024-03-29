/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { Card } from "../ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../ui/button";
import Image from "next/image";
import EditProfile from "./EditProfile";
import EditProfileDialog from "./EditProfiledialog";
import { formatPrice } from "@/lib/utils";

const ViewProfile = () => {
    return (
        <Card className="w-[900px] shadow-md hover:bg-gray-100 my-6">
            <div className="py-4 flex justify-between items-center mx-2">
                <div className="flex items-center gap-3">
                    <Image src="/assets/jb.svg" width={100} height={100} alt="user" />
                    <div className="items-center">
                        <h2 className="text-3xl font-bold">Name</h2>
                        <p>Location</p>
                        <Card className="p-2">Front end developer</Card>
                    </div>
                </div>

                <div className=" flex gap-4">
                    <Button variant="btn_green">Profile Settings</Button>
                    <Button variant="btn_green" size="lg">
                        View Profile
                    </Button>
                </div>
            </div>
            <Separator className=" w-full h-[1px] bg-black rounded-lg" />
            <div className="py-2 flex justify-between items-center mx-2">
                <div className="flex px-10 gap-2">
                    <h1>Amrit Acharya</h1>
                    <div className=" flex rounded-full border border-Green bg-white justify-center items-center w-8 h-8">
                        <EditProfileDialog name="Your title" type="Edit your Title" />
                    </div>
                </div>
                <div className="flex px-12">
                    <span>{formatPrice(5)}</span>
                    <div className=" flex rounded-full border border-Green bg-white justify-center items-center w-8 h-8">
                        <EditProfileDialog name="Your rate" type="Edit your Rate" />
                    </div>
                </div>
                <div>

                </div>




            </div>
            <div className="flex ">
                <div>
                    <p className="px-10">
                        Hello there! I am a passionate and hardworking React & MERN Stack
                        Developer who loves building websites. I'm great at making things look
                        good and work smoothly. I'm always learning new things to make sure
                        I'm up-to-date with the latest technology stuff in web development.
                    </p>
                </div>

                <span>
                    <div className=" flex rounded-full border border-Green bg-white justify-center items-center w-8 h-8">
                        <EditProfileDialog name="Write about yourself" type="Bio" />
                    </div>

                </span>

            </div>

            <div className=" flex py-5 px-10">
                Work history
            </div>
            <Separator className=" w-full h-[1px] bg-black rounded-lg" />
            <div className="flex py-5 px-10">

                Portfolio
            </div>
            <Separator className=" w-full h-[1px] bg-black rounded-lg" />

            <div className="py-5 px-10">
                Skills
                <div className="flex items-center py-4 gap-4 px-6 ">

                    <Button variant="outline" size='sm'>sKILS</Button>
                    <Button variant="outline" size='sm'>sKILS</Button>
                    <Button variant="outline" size='sm'>sKILS</Button>
                </div>
            </div>


        </Card>
    );
};

export default ViewProfile;
