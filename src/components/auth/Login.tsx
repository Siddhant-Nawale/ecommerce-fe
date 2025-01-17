import React, { useState } from "react";
import LoginTypeSelector from "./LoginTypeSelector";
import LoginForm from "./LoginForm";

enum LoginWithType {
  OTP = "OTP",
  PASSWORD = "Password",
}

const Login: React.FC = () => {
  const [loginWith, setLoginWith] = useState<LoginWithType>(LoginWithType.OTP);

  return (
    <div className="login-page flex-col">
      <div className="img-wrapper">
        <img
          src="https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg"
          alt="Background"
        />
      </div>
      <LoginTypeSelector selectedType={loginWith} onSelect={setLoginWith} />
      <LoginForm loginWith={loginWith} />
    </div>
  );
};

export default Login;
