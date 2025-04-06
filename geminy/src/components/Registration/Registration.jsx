import React, { useState } from "react";
// import Logo from "../image/Header_Logo.png";
// import Login_img from "../image/Rectangle_Img.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiRequest from "../../lib/Apirequest"; // Replace with your API utility

const Registration = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;
  
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
  
    try {
      const { data } = await apiRequest.post("/register", {
        fname: firstName,
        lname: lastName,
        email,
        phone,
        password,
        cpassword: confirmPassword,
      });
  
      // Store user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center h-screen w-100 row row_login">
        <div className="p-4 col-6 login_col_6">
          {/* <img className="Login_img" src={Login_img} alt="Login_page" /> */}
        </div>
        <div className="p-2 col-6 login_col_6">
          <div className="mb-3">
            {/* <img className="Header_Logo" src={Logo} alt="Logo" /> */}
          </div>
          <div className="mx-5">
            <h2 className="fw-bold">Sign up</h2>
            <p className="font-sm mb-4">
              Login to access your travelwise account
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 row">
                <div className="col-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Enter your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <div className="input-group mb-2">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="************"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary input-group-text"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-group mb-2">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="************"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary input-group-text"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              Don’t have an account?
              <Link
                to="/login"
                className="text-orange-600 font-semibold ms-1 text-decoration-none"
              >
                LogIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
