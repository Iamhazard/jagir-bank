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
            <div className="py-10 px-6 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center pb-5 sm:pb-0">
                    <h1 className="text-4xl items-center font-medium mr-4">Your workspace</h1>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/clientdashboard/allJobsPost">
                            <Button variant="link" className="text-Green">All Job Post</Button>
                        </Link>
                        <Separator orientation="vertical" className="hidden sm:block" />
                        <Link href='/clientdashboard/allContract'>
                            <Button variant="link" className="text-Green">All Contract</Button>
                        </Link>
                        <Separator orientation="vertical" className="hidden sm:block" />
                        <Link href="/clientdashboard/draftPost">
                            <Button variant="link" className="text-Green">All Draft post</Button>
                        </Link>
                    </div>
                </div>
                <Link href='/clientProfile'>
                    <Button variant="btn_green" className="mt-5 sm:mt-0">+ Post a job</Button>

                </Link>
            </div>
            <section className="border-t border-slate-400 bg-emerald-200">
                <MaxWidthWrapper className="py-20">
                    <div>
                        <ClientCard />
                    </div>
                </MaxWidthWrapper>
            </section>
            <div className="px-6 py-5">
                <h2 className="text-2xl font-medium pb-3">Complete these steps to stand out and hire fast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className={cn("py-3")}>
                        <small>Require to hire</small>

                    </Card>
                    <Card className={cn("py-3")}>
                        <small>Require to hire</small>
                        <div>
                            <Button variant="link">You verified your email address.</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Clientdata;
