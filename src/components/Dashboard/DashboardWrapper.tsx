import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import authorizationservice from "../../services/authorizationservice";
import { policyConfigs } from "../../configs/policyConfigs";
import ManagementDashboard from "./ManagementDashboard";
import CustomerDashboard from "./CustomerDashboard";

const policyParentName = "dashboard";

const DashboardWrapper: React.FC = () => {
  const { user } = useUser();
  const [dashboardMode, setDashboardMode] = useState<string>("");
  const [canChangeMode, setCanChangeMode] = useState(false);

  useEffect(() => {
    let modeSet = false;

    if (
      authorizationservice.authorise(policyConfigs[policyParentName].MANAGEMENT)
    ) {
      setDashboardMode(policyConfigs[policyParentName].MANAGEMENT);
      setCanChangeMode(true);
      modeSet = true;
    }

    if (
      !modeSet &&
      authorizationservice.authorise(policyConfigs[policyParentName].CUSTOMER)
    ) {
      setDashboardMode(policyConfigs[policyParentName].CUSTOMER);
    }
  }, [user]);

  return (
    <>
      {dashboardMode === policyConfigs[policyParentName].MANAGEMENT ? (
        <ManagementDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </>
  );
};

export default DashboardWrapper;
