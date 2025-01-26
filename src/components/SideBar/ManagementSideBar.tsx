import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import authorizationservice from "../../services/authorizationservice";
import { managementSideBarConfig } from "../../configs/managementSideBarConfig";
import { CgGym } from "react-icons/cg";

const ManagementSideBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [fixedAtMaximun, setFixedAtMaximum] = useState(false);
  const [processedMenuItems, setProcessedMenuItems] = useState<
    { label: string; route: string; icon: string; policy?: string }[]
  >([]);

  useEffect(() => {
    const filteredItems = managementSideBarConfig.filter(
      (item) => item.policy && authorizationservice.authorise(item.policy)
    );
    setProcessedMenuItems(filteredItems);
  }, []);

  const toggleMaximization = () => {
    if (!fixedAtMaximun) {
      setIsMaximized((prev) => !prev);
    }
  };

  const handlePermanentMaximization = () => {
    setFixedAtMaximum((prev) => !prev);
  };

  return (
    <>
      <div
        className={`management-sidebar-placeholder ${
          fixedAtMaximun ? "maximized" : "minimized"
        }`}
      ></div>
      <div
        className={`management-sidebar ${
          isMaximized || fixedAtMaximun ? "maximized" : "minimized"
        }`}
        onMouseEnter={toggleMaximization}
        onMouseLeave={() => !fixedAtMaximun && setIsMaximized(false)}
      >
        {(isMaximized || fixedAtMaximun) && (
          <button
            className="toggle-button"
            onClick={handlePermanentMaximization}
          >
            {fixedAtMaximun ? "<" : ">"}
          </button>
        )}

        <div className="sidebar-title-wrapper">
          {isMaximized || fixedAtMaximun ? (
            <h1 className="sidebar-title">Management Dashboard</h1>
          ) : (
            <div className="logo-wrapper flex-row">
            <CgGym size={30} />
            </div>
          )}
        </div>
        <nav>
          <div
            className={`sidebar-menu ${
              isMaximized || fixedAtMaximun ? "maximized" : "minimized"
            }`}
          >
            {processedMenuItems.map((item) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons];
              return (
                <Link
                  to={item.route}
                  className={`menu-item ${
                    isMaximized || fixedAtMaximun ? "maximized" : "minimized"
                  }`}
                  key={item.label}
                >
                  {!(isMaximized || fixedAtMaximun) && IconComponent && (
                    <IconComponent className="menu-icon" />
                  )}
                  {isMaximized || fixedAtMaximun ? item.label : null}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default ManagementSideBar;
