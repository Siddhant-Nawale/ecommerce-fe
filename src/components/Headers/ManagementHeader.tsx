import React, { useMemo } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import apiService from "../../services/apiService";
import { useLocation } from "react-router-dom";
import { managementSideBarConfig } from "../../configs/managementSideBarConfig";

const ManagementHeader = () => {
  const location = useLocation();

  const currentRouteConfig = useMemo(() => {
    return managementSideBarConfig.find(
      (item) => item.displayInHeader && item.route === location.pathname
    );
  }, [location.pathname]);

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
      <span className="user-name">{currentRouteConfig?.label || ""}</span>
      <button onClick={handleLogout} className="logout-button" title="Logout">
        <FaSignOutAlt size={20} className="logout-icon" />
      </button>
    </div>
  );
};

export default ManagementHeader;
