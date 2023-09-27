import React from "react";
import NavBar from "../components/NavBar";
import DashBoard from "../components/DashBoard";

const AdminDashboardPage = () => {
  return (
    <>
      <div className="w-full flex flex-col  h-screen text-gray-700 ">
        <nav className="flex h-10 w-full">
          <NavBar />
        </nav>
        <div className="flex basis-[90%]">
          <DashBoard />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
