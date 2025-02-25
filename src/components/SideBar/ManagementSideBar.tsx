import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa"; // FontAwesome icons
import * as GoIcons from "react-icons/go"; // GitHub Octicons (GoProjectTemplate comes from here)
import authorizationservice from "../../services/authorizationservice";
import { managementSideBarConfig } from "../../configs/managementSideBarConfig";
import { CgGym } from "react-icons/cg";

const iconSets = { ...FaIcons, ...GoIcons };

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
          fixedAtMaximun
            ? "maximized"
            : "minimized"
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
              isMaximized || fixedAtMaximun ? "sidebar-menu-maximized" : "sidebar-menu-minimized"
            }`}
          >
            {processedMenuItems.map((item) => {
              const IconComponent =
                iconSets[item.icon as keyof typeof iconSets];
              return (
                <Link
                  to={item.route}
                  className={`menu-item ${
                    isMaximized || fixedAtMaximun ? "menu-item-maximized" : "menu-item-minimized"
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
