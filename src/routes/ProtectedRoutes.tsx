import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardWrapper from "../components/Dashboard/DashboardWrapper";
import RouteGuard from "../components/RouteGuard";

const ProtectedRoutes: React.FC = () => {
  return (
    <RouteGuard>
      <Routes>
        <Route path="*" element={<DashboardWrapper />} />
      </Routes>
    </RouteGuard>
  );
};

export default ProtectedRoutes;
