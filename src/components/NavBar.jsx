import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

const NavBar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };
  return (
    <div className="flex basis-[100%] justify-between items-center ml-10 mr-10">
      <span className="text-3xl">APP</span>
      <button
        className="flex border border-black h-8 w-32 justify-center items-center rounded-[30px]"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
