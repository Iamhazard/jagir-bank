import DefaultLayout from "@/Components/admin/dashbaord/DefaultLayout";
import React, { ReactNode } from "react";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <DefaultLayout />
      {children}
    </div>
  );
};

export default ProtectedLayout;
