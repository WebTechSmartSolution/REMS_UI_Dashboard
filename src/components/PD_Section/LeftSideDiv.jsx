import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../style/PD_Section.css"; // Make sure to create this CSS file
import { notify } from "../../utils/Notification";
// import authService from "../../../services/Auth_JwtApi/AuthService";

const RequestInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
// making chat room for the user to get more information to the Owner
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      notify("success", "Your message has been sent successfully.");  
    }, 5000);
    // console.log("Form data submitted:", formData);
  };

  return (
    <div className="request-info">
      <h3>Request More Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestInfo;
