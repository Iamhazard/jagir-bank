"use client"
import React from "react";
import ClientCard from "./clientCard";

import MaxWidthWrapper from "./maxwidthWrappers";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import Link from "next/link";
import { Card } from "@/Components/ui/card";
import { cn } from "@/lib/utils";

const Clientdata = () => {
    return (
        <>
            <div className=" py-10 px-6 flex justify-between">
                <div className="flex">
                    <h1 className="text-4xl items-center font-medium ">Your workspace</h1>
                    <div className=" flex items-center px-4 gap-3">
                        <Link href="/clientdashboard/allPost">
                            <Button variant='link' className="text-Green">All Job Post</Button>
                        </Link>

                        <Separator orientation="vertical" />
                        <Link href='/'>
                            <Button variant="link" className="text-Green">All Contract</Button>
                        </Link>

                        <Separator orientation="vertical" />
                        <Link href="/clientdashboard/draftPost">
                            <Button variant='link' className="text-Green">All Draft post</Button>
                        </Link>

                    </div>

                </div>
                <Button variant='btn_green'>+ Post a job</Button>
            </div>
            <section className="border-t border-slate-400 bg-emerald-200">
                <MaxWidthWrapper className="py-20">
                    <div>
                        <ClientCard />
                    </div>

                </MaxWidthWrapper>

            </section>
            <div className="px-6 py-5 items-start">
                <h2 className="text-2xl font-medium pb-3">Complete these steps to stand out and hire fast</h2>
                <div className="flex gap-4 space-x-5">
                    <Card className={cn("w-[250px] py-3")}>
                        <small>Require to hire</small>
                        <div>
                            <Button variant="link" >Add a billing method</Button>
                        </div>
                    </Card>
                    <Card className={cn("w-[250px] py-3")}>
                        <small>Require to hire</small>
                        <div>
                            <Button variant="link" >You verified your email address.</Button>
                        </div>
                    </Card>
                </div>

            </div>

        </>
    );
};

export default Clientdata;
