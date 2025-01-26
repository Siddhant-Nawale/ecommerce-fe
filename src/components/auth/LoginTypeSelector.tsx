import React from "react";

export enum LoginWithType {
  OTP = "OTP",
  PASSWORD = "Password",
}

interface LoginTypeSelectorProps {
  selectedType: LoginWithType;
  onSelect: (type: LoginWithType) => void;
}

const LoginTypeSelector: React.FC<LoginTypeSelectorProps> = ({
  selectedType,
  onSelect,
}) => {
  return (
    <div className="type-selector-wrapper flex-row flex-center">
      <div className="type-selector flex-row">
        {Object.values(LoginWithType).map((type) => (
          <div
            key={type}
            className={`type-selector-option ${
              selectedType === type ? "selected" : ""
            }`}
            onClick={() => onSelect(type)}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginTypeSelector;
