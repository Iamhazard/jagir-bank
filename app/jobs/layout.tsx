import React, { ReactNode } from "react";

import JobTabs from "@/Components/FreelancerWoks/JobTabs";
import NavBar from "@/Components/Navbar/Navbar";
import SideBars from "./_components/Sidebars";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex flex-col">
      <SideBars />
      <JobTabs>
        <div>{children}</div>
      </JobTabs>
    </main>
  );
};

export default ProtectedLayout;
