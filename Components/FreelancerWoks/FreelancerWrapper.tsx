import React from "react";
import { Card } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Switch } from "@/Components/ui/switch";

import { Label } from "../ui/label";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import AlertDialogs from "./AlertDialog";

const FreelancerWrapper = () => {
  return (
    <Card className="w-[250px] px-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Promote with ads</AccordionTrigger>
          <AccordionContent>
            <div className="flex-col items-center space-y-3">
              <div className="flex flex-col px-6 space-y-2">
                <div className="flex">
                  <Label
                    htmlFor="badge"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    {" "}
                    Availability badge
                  </Label>
                  <Switch id="badge" />
                </div>
              </div>

              <div className="flex flex-col px-6  space-y-2">
                <div className="flex">
                  <Label
                    htmlFor="boost"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    {" "}
                    Boost your Profile
                  </Label>
                  <Switch id="boost" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Connects</AccordionTrigger>
          <AccordionContent>
            <div className="flex-col items-center space-y-3 ">
              <h1 className="px-2">Available: 120</h1>
              <div className="flex gap-2">
                <Link
                  className={buttonVariants({
                    variant: "link",
                    className: "text-sm ",
                  })}
                  href="/sign-in">
                  View details
                </Link>
                <Link
                  className={buttonVariants({
                    variant: "link",
                    className: "text-sm ",
                  })}
                  href="/sign-in">
                  Buy Connects
                </Link>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Preferences</AccordionTrigger>
          <AccordionContent>
            <div className="flex-col items-center space-y-3">
              <div className="flex flex-col px-6 space-y-2">
                <div className="flex">
                  <Label
                    htmlFor="badge"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    {" "}
                    Profile Visibility
                  </Label>
                  <Switch id="badge" />
                </div>
              </div>

              <div className="flex flex-col px-6  space-y-2">
                <div className="flex">
                  <Label
                    htmlFor="boost"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2">
                    {" "}
                    Job Preferences
                  </Label>
                  <AlertDialogs />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Proposal</AccordionTrigger>
          <AccordionContent>
            <div className="flex-col items-center space-y-3">
              <Link
                className={buttonVariants({
                  variant: "link2",
                  className: "gap-1.5",
                })}
                href="/sign-in">
                My proposal
              </Link>
              <small>
                Looking for work? Browse jobs and get started on a proposal.
              </small>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default FreelancerWrapper;
