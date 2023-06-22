import { useState } from "react";

import "./auth.scss";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const goHomepage = () => {
    navigate("/");
  };

  const goSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have account yet?</span>
        <button className="sign-up-button" onClick={() => goSignUp()}>
          Sign up
        </button>
      </div>
      <div className="title col-4 mx-auto">Chart App</div>
      <div className="welcome col-4 mx-auto">Hello, who are you?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            className="btn-submit"
            disabled={isLoading}
            onClick={() => {}}
          >
            {isLoading === true && (
              <AiOutlineLoading3Quarters className="loading-icon" />
            )}
            <span> Login to Chart App</span>
          </button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => goHomepage()}>
            &#60; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
