import NavBar from "@/Components/Navbar/Navbar";

import React, { ReactNode } from "react";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex flex-col min-h-screen">
      <NavBar />
      <div className=" flex flex-1 mx-20 ">{children}</div>
    </main>
  );
};

export default ProtectedLayout;
