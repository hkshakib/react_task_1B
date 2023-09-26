import React from "react";
import NavBar from "../components/NavBar";

const AdminDashboardPage = () => {
  return (
    <>
      <div className="w-full flex flex-col  h-screen text-gray-700 ">
        <nav className="flex h-10 w-full">
          <NavBar />
        </nav>
        <div className="flex basis-[90%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
          possimus adipisci optio dicta culpa pariatur voluptates architecto qui
          fuga nemo error id eligendi facere quisquam dolorem ea, in ipsam
          minus?
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
