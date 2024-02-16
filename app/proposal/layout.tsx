import React, { ReactNode } from "react";
import JobsNavBar from "../jobs/_components/JobsNavbar";



const ProposalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="relative flex flex-col">
            <JobsNavBar />

            <div>{children}</div>

        </main>
    );
};

export default ProposalLayout;
