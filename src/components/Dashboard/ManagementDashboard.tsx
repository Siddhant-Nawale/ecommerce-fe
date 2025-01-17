import React from "react";
import ManagementSideBar from "../SideBar/ManagementSideBar";

const ManagementDashboard: React.FC = () => {
  return (
    <div className="management-dashboard">
      <ManagementSideBar />
      <div className="content-area">
        <h1>ManagementD Dashboard</h1>
        <p>Welcome to the management dashboard. Content will be added soon!</p>
      </div>
    </div>
  );
};

export default ManagementDashboard;
