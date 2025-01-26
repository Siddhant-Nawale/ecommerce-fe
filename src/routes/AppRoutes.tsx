import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import DashboardWrapper from "../components/Dashboard/DashboardWrapper";
import { useUser } from "../contexts/UserContext";
import ProtectedRoutes from "./ProtectedRoutes";
const AppRoutes: React.FC = () => {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/" element={<DashboardWrapper />} />
      {/* {!user && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </>
      )} */}
      <Route path="*" element={<ProtectedRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
