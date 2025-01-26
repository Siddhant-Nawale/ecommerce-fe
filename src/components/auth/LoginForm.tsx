import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginWithType } from "./LoginTypeSelector";
import ApiService from "../../services/apiService";
import { useUser } from "../../contexts/UserContext";
import authorizationservice from "../../services/authorizationservice";
import { wait } from "../../utils/common.utils";

interface LoginFormProps {
  loginWith: LoginWithType;
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ loginWith, onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // Flag to check if OTP is sent
  const [otpSentError, setOtpSentError] = useState<string | null>(null); // Error state for OTP send failure
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let user;

    if (loginWith === LoginWithType.OTP) {
      if (isOtpSent) {
        // Handle OTP submission
        try {
          const loginResponse = await ApiService.verifyOtp({
            phone: phoneNumber,
            otp,
          });
          await ApiService.loginWithOTP({ phone: phoneNumber });
          user = loginResponse?.data?.user;
          if (user) {
            setUser(user);
            authorizationservice.initialiseAuthorization(user);
            navigate("/");
            onLogin();
          }
        } catch (error) {
          setOtpSentError("Invalid OTP. Please try again.");
        }
      } else {
        // Send OTP
        try {
          handleSendOtp();
          setIsOtpSent(true); // Mark OTP as sent
          setOtpSentError(null); // Reset error on successful OTP request
        } catch (error) {
          setOtpSentError("Failed to send OTP. Please try again.");
        }
      }
    } else {
      const loginResponse = await ApiService.loginWithPassword({
        phone: phoneNumber,
        password,
      });
      user = loginResponse?.data?.user;
      if (user) {
        setUser(user);
        authorizationservice.initialiseAuthorization(user);
        onLogin();
        navigate("/");
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      await ApiService.loginWithOTP({ phone: phoneNumber });
      setOtpSentError(null); // Reset error on successful resend
    } catch (error) {
      setOtpSentError("Failed to resend OTP. Please try again.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-form">
      {loginWith === LoginWithType.OTP ? (
        <>
          <h3>{isOtpSent ? "Enter OTP" : "Login with OTP"}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            {isOtpSent ? (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit">Submit OTP</button>
                <button
                  type="button"
                  className="resend-otp-button"
                  onClick={handleSendOtp}
                >
                  Resend OTP
                </button>
              </>
            ) : (
              <button type="submit">Send OTP</button>
            )}
          </form>
          {otpSentError && <div className="error">{otpSentError}</div>}
        </>
      ) : (
        <>
          <h3>Login with Password</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Enter your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </>
      )}
      <button className="register-button" onClick={handleRegisterClick}>
        Register
      </button>
    </div>
  );
};

export default LoginForm;
