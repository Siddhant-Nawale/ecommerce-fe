import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import authorizationservice from "../../services/authorizationservice";
import { policyEnum } from "../../configs/policyEnum";
import ManagementDashboard from "./ManagementDashboard";
import CustomerDashboard from "./CustomerDashboard";

const DashboardWrapper: React.FC = () => {
  const { user } = useUser();
  const [dashboardMode, setDashboardMode] = useState<string>("");
  const [canChangeMode, setCanChangeMode] = useState(false);

  useEffect(() => {
    let modeSet = false;

    if (authorizationservice.authorise(policyEnum.MANAGEMENT)) {
      setDashboardMode(policyEnum.MANAGEMENT);
      setCanChangeMode(true);
      modeSet = true;
    }

    if (!modeSet && authorizationservice.authorise(policyEnum.CUSTOMER)) {
      setDashboardMode(policyEnum.CUSTOMER);
    }
  }, [user]);

  return (
    <>
      {dashboardMode === policyEnum.MANAGEMENT ? (
        <ManagementDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </>
  );
};

export default DashboardWrapper;
