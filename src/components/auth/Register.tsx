import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form default behavior (page reload)

    console.log(
      "Registering with name, phone, and password",
      name,
      phone,
      password
    );

    const registerResponse = await apiService.register({ phone, name, password });
    if (registerResponse?.data?.user?.id) {
      navigate("/login")
    }
  };

  return (
    <div className="register-page">
      <div className="img-wrapper">
        <img
          src="https://thumbs.dreamstime.com/b/diet-healthy-food-lifestyle-health-concept-sport-exercise-equipment-workout-and-gym-background-nutrition-detox-salad-f-179855057.jpg"
          alt="Background"
        />
      </div>
      <div className="register-form">
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <button
          className="back-to-login-button"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
