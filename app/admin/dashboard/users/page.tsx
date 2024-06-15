import React from "react";
import UsersTable from "@/Components/admin/dashbaord/UsersTable";

const UserLayout = () => {
  return (
    <>
      <header className="bg-transparent shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            User
          </h1>
        </div>
      </header>
      <main>
        <div className=" flex mx-auto items-center justify-center max-w-7xl  sm:px-6 lg:px-8">
          {/* Your content */}

          <UsersTable />
        </div>
      </main>
    </>
  );
};

export default UserLayout;
