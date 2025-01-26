import React from "react";
import ManagementSideBar from "../SideBar/ManagementSideBar";
import { Route, Routes } from "react-router-dom";
import UserManagement from "../UserManagement";
import ManagementHeader from "../Headers/ManagementHeader";

const ManagementDashboard: React.FC = () => {
  return (
    <div className="management-dashboard">
      <ManagementSideBar />
      <div className="content-header-wrapper flex-col">
        <ManagementHeader />
        <div className="content-area">
          <Routes>
          <Route path="*" element={<></>} />
            <Route
              path="/dashboard/user-management"
              element={<UserManagement />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
