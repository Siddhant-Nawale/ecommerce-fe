import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import AppRoutes from "./routes/AppRoutes";
import "./styles/index.scss";
import LoginAuthCheck from "./components/auth/LoginAuthCheck";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <>
      <UserProvider>
        <LoginAuthCheck>
          <Router>
            <AppRoutes />
          </Router>
        </LoginAuthCheck>
      </UserProvider>
      <ToastContainer />
    </>
  );
};

export default App;
