import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
          <Route index element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      );
    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
  }
}

function Main() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log({ isAuthenticated });

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="w-full">
          <div className="w-full page-wrapper py-10 px-5">
            {!isAuthenticated ? renderRoutes("") : renderRoutes("admin")}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
