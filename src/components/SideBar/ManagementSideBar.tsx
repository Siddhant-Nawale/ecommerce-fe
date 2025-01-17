import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authorizationservice from "../../services/authorizationservice";
import { managementSideBarConfig } from "../../configs/managementSideBarConfig";

const ManagementSideBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [fixedAtMaximun, setFixedAtMaximum] = useState(false);
  const [processedMenuItems, setProcessedMenuItems] = useState<
    { label: string; route: string; minimisedLabel: string; policy?: string }[]
  >([]);

  useEffect(() => {
    const letterCount: { [key: string]: number } = {};
    const processed = managementSideBarConfig.map((item) => {
      const firstLetter = item.label[0];

      if (letterCount[firstLetter]) {
        letterCount[firstLetter] += 1;
        return {
          ...item,
          minimisedLabel: item.label.slice(0, 2),
        };
      } else {
        letterCount[firstLetter] = 1;
        return {
          ...item,
          minimisedLabel: firstLetter,
        };
      }
    });

    setProcessedMenuItems(
      processed.filter(
        (item) => item.policy && authorizationservice.authorise(item.policy)
      )
    );
  }, [managementSideBarConfig]);

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
        <button className="toggle-button" onClick={handlePermanentMaximization}>
          {fixedAtMaximun ? "<" : ">"}
        </button>

        <>
          <div className="sidebar-title-wrapper">
            {isMaximized || fixedAtMaximun ? (
              <h1 className="sidebar-title">Management Dashboard</h1>
            ) : (
              <></>
            )}
          </div>
          <nav>
            <div
              className={`sidebar-menu ${
                isMaximized || fixedAtMaximun ? "maximized" : "minimized"
              }`}
            >
              {processedMenuItems.map((item) => (
                <Link
                  to={item.route}
                  className={`menu-item ${
                    isMaximized || fixedAtMaximun ? "maximized" : "minimized"
                  }`}
                  key={item.label}
                >
                  {isMaximized || fixedAtMaximun
                    ? item.label
                    : item.minimisedLabel}
                </Link>
              ))}
            </div>
          </nav>
        </>
      </div>
    </>
  );
};

export default ManagementSideBar;
