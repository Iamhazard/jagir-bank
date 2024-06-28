"use client"
import React, { ReactNode } from "react";
import AccountNavbar from "@/Components/ui/AccountNavbar";


const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AccountNavbar />
      <div className="h-full flex items-center justify-center">{children}</div>
    </div>
  );
};

export default ProfileLayout;
