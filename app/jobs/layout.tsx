import React, { ReactNode } from "react";

import JobTabs from "@/Components/FreelancerWoks/JobTabs";
import JobsNavBar from "./_components/JobsNavbar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex flex-col">
      <JobsNavBar />
      <JobTabs>
        <div>{children}</div>
      </JobTabs>
    </main>
  );
};

export default ProtectedLayout;
