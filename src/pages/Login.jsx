import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/Notification";
import apiService from "../Service/apiService";
import "../styles/Login.css"; // Import the CSS file

const Login = () => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    try {
      const response = await apiService.loginAdmin(data);
      if (response?.token) {
        localStorage.setItem("admintoken", response.token);
        notify("success", "Login successful");
        navigate("/");
      } else {
        notify("error", "Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      notify("error", "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: true })}
                className="form-control"
              />
              <span
                className="eye-icon"
                onClick={togglePasswordVisibility}
                role="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
