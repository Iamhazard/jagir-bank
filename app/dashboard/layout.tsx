import DefaultLayout from "@/Components/admin/dashbaord/DefaultLayout";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex flex-col min-h-screen">
      <DefaultLayout />
      <div className=" w-full">{children}</div>
    </main>
  );
};

export default DashboardLayout;
