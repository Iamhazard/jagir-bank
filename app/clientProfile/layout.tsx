import AccountNavbar from "@/Components/ui/AccountNavbar";
import React, { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AccountNavbar />
      <div className="h-full flex items-center justify-center">{children}</div>
    </>

  );
};

export default ProfileLayout;
