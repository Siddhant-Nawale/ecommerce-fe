import React, { useMemo, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ManagementSideBar from "../SideBar/ManagementSideBar";
import ManagementHeader from "../Headers/ManagementHeader";
import { useUser } from "../../contexts/UserContext";
import { routePolicyMap } from "../../configs/routePolicyMap";

// Lazy-load components
const UserManagement = lazy(() => import("../UserManagement"));
const TemplateManagement = lazy(() => import("../TemplateManagement")); // Example additional page

// Map route paths to components
const routeComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
  "/dashboard/user-management": UserManagement,
  "/dashboard/templates": TemplateManagement, 
};

const ManagementDashboard: React.FC = () => {
  const { user } = useUser();

  // Memoize user policies to avoid unnecessary re-renders
  const userPolicies = useMemo(() => user?.policies?.map((policy) => policy.name) || [], [user?.policies]);

  // Memoize authorized routes
  const authorizedRoutes = useMemo(
    () =>
      Object.entries(routePolicyMap).filter(([path, requiredPolicies]) =>
        requiredPolicies.some((policy) => userPolicies.includes(policy))
      ),
    [userPolicies]
  );

  return (
    <div className="management-dashboard">
      <ManagementSideBar />
      <div className="content-header-wrapper flex-col">
        <ManagementHeader />
        <div className="content-area">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="*" element={<></>} />
              {authorizedRoutes.map(([path]) => {
                const Component = routeComponents[path];
                return Component ? <Route key={path} path={path} element={<Component />} /> : null;
              })}
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
