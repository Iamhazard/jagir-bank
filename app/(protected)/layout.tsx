import React, { ReactNode } from "react";
import Headers from "./_components/header";
import Headermobile from "./_components/header-mobile";

import MarginWidthWrapper from "./_components/margin-width-wrapper";
import PageWrapper from "./_components/page-wrapper";
import SideNav from "./_components/Sidebar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className="flex">
        <SideNav />
      </div>
      <div className="flex-1">
        <MarginWidthWrapper>
          <Headers />
          <Headermobile />

          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </div>
    </main>
  );
};

export default ProtectedLayout;
