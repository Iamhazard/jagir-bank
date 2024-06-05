import React, { ReactNode } from "react";

import JobTabs from "@/Components/FreelancerWoks/JobTabs";
import NavBar from "@/Components/Navbar/Navbar";
import SideBars from "./_components/Sidebars";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex flex-col">

      <SideBars />
      <div className="flex-1">
        <JobTabs>
          <div>{children}</div>
        </JobTabs>
      </div>

    </main>
  );
};

export default ProtectedLayout;
