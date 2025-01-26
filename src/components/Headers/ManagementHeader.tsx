import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import apiService from "../../services/apiService";

const ManagementHeader = () => {
  const handleLogout = async () => {
    try {
      await apiService.logout();
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="management-header">
      <button onClick={handleLogout} className="logout-button" title="Logout">
        <FaSignOutAlt size={20} className="logout-icon" />
      </button>
    </div>
  );
};

export default ManagementHeader;
