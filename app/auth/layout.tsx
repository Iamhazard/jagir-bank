import NavBar from "@/Components/Navbar/Navbar";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavBar />
      <div className="h-full flex items-center justify-center">{children}</div>
    </main>
  );
};

export default AuthLayout;
