import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RouteGuard from "../components/RouteGuard";

const ProtectedRoutes: React.FC = () => {
  return (
    <RouteGuard>
      <Routes>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </RouteGuard>
  );
};

export default ProtectedRoutes;
