import React, { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default ProfileLayout;
