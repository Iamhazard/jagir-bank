import React, { ReactNode } from "react";
import NavBar from "@/Components/Navbar/Navbar";
import JobTabs from "@/Components/FreelancerWoks/JobTabs";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex flex-col">
      <NavBar />
      <JobTabs>
        <div>{children}</div>
      </JobTabs>
    </main>
  );
};

export default ProtectedLayout;
