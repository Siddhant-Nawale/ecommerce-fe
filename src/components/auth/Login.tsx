import React, { useState } from "react";
import LoginTypeSelector from "./LoginTypeSelector";
import LoginForm from "./LoginForm";

enum LoginWithType {
  OTP = "OTP",
  PASSWORD = "Password",
}
interface LoginProps {
  onLogin: () => void; // Specify the type for the onLogin prop
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loginWith, setLoginWith] = useState<LoginWithType>(LoginWithType.OTP);

  return (
    <div className="login-page flex-col">
      <LoginTypeSelector selectedType={loginWith} onSelect={setLoginWith} />
      <LoginForm loginWith={loginWith} onLogin={onLogin} />
    </div>
  );
};

export default Login;
