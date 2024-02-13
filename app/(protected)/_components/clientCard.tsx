"use client";
import * as React from "react";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";

import { MdAddCircle } from "react-icons/md";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ClientCard = () => {
    const draft = null;
    return (
        <Card className="w-[250px] ">

            <CardContent>
                <div className="flex items-center justify-center py-6">
                    <Link href='/clientProfile'>
                        <MdAddCircle size={25} color="green" />
                    </Link>

                </div>
                <small className=" text-gray-800 whitespace-break-spaces">
                    Start your next job
                    Post and hire
                    fast
                </small>

            </CardContent>
            {draft ? (
                <CardFooter className="flex justify-between">
                    <Button variant="outline" className={cn("px-4 items-center  border-Green border-[1px]")} size='sm'>fill a draft</Button>

                </CardFooter>
            ) : (<> </>)}

        </Card>
    );
};

export default ClientCard;
