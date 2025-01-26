import React from "react";
import { useMediaQuery } from "@mui/material";
import CustomerHeaderMobile from "../Headers/CustomerHeaderMobile";
import CustomerHeaderLaptop from "../Headers/CustomerHeaderLaptop";
import DashboardTemplateRenderer from "./DashboardTemplateRenderer";
import { productListTemplate } from "../../apiMockData/productListTemplate";

const CustomerDashboard: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div className="dashboard">
      {isMobile ? <CustomerHeaderMobile /> : <CustomerHeaderLaptop />}
      <div className="dashboard-content">
        <DashboardTemplateRenderer template={productListTemplate}/>
      </div>
    </div>
  );
};

export default CustomerDashboard;
