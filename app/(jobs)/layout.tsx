import JobTabs from "@/Components/FreelancerWoks/JobTabs";

import React, { ReactNode } from "react";
import NavBar from "@/Components/Navbar/Navbar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex flex-col">
      <NavBar />
      <JobTabs />
      <div>{children}</div>
    </main>
  );
};

export default ProtectedLayout;
