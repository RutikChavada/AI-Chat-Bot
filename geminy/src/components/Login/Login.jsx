  import React, { useState } from "react";
  // import Logo from "../image/Header_Logo.png";
  // import "bootstrap/dist/css/bootstrap.min.css";
  // import "bootstrap/dist/js/bootstrap.bundle.min";

  // import Login_img from "../image/Login_page.png";
  import { Link, useNavigate } from "react-router-dom";
  import { FaEye, FaEyeSlash } from "react-icons/fa";
  import apiRequest from "../../lib/Apirequest";
  // import './Login.css';

  const Login_page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      if (!email || !password) {
        setError("Both email and password are required.");
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await apiRequest.post("/login", { email, password });
    
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
    
        navigate("/");
      } catch (err) {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center h-screen w-100 row row_login">
          <div className="p-2 col-6">
            <div className="mb-3">
              {/* <img className="Header_Logo" src={Logo} alt="Logo" /> */}
            </div>
            <div className="mx-5 px-5">
              <h2 className="fw-bold">Login</h2>
              <p className="font-sm mb-4">
                Login to access your travelwise account
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="************"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <div className="d-flex justify-content-between mb-3">
                  <label>
                    <input type="checkbox" className="me-2" autoComplete="off" />
                    Remember Me
                  </label>
                  <Link
                    to="/forgotpassword"
                    className="text-orange-600 text-sm text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging In..." : "Login"}
                </button>
              </form>
              <p className="text-center text-sm mt-4">
                Don’t have an account?
                <Link
                  to="/registration"
                  className="text-orange-600 font-semibold ms-1 text-decoration-none"
                >
                  Registration
                </Link>
              </p>
            </div>
          </div>
          <div className="p-4 col-6">
            {/* <img className="Login_img" src={Login_img} alt="Login_page" /> */}
          </div>
        </div>
      </div>
    );
  };

  export default Login_page;
