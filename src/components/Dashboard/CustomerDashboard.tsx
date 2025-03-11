import { useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import apiService from "../../services/apiService";
import CustomerHeaderLaptop from "../Headers/CustomerHeaderLaptop";
import CustomerHeaderMobile from "../Headers/CustomerHeaderMobile";
import TemplateRenderer from "../TemplateRenderer";

const CustomerDashboard: React.FC = () => {
  const [tempate, setTemplate] = useState({} as any);
  const isMobile = useMediaQuery("(max-width:768px)");
  const fetchTeplate = useCallback( async() => {
    // const result = (await apiService.getTemplateWithId("187efc34-2ba4-4ed6-a40f-d2b572600a2f"))?.data;
    const result = (await apiService.getActiveTemplateByType("Dashboard"))?.data;
    setTemplate(result);
  }, []);
  useEffect(() => {
    fetchTeplate();
  }, []);
  return (
    <div className="dashboard flex-col flex-center">
      {isMobile ? <CustomerHeaderMobile /> : <CustomerHeaderLaptop />}
      <div className="dashboard-content">
        <TemplateRenderer template={tempate?.template} />
      </div>
    </div>
  );
};

export default CustomerDashboard;
