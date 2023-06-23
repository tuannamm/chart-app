import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import icons from "../../utils/icons";
import constant from "../../utils/constant";
import "./auth.scss";

const { AiOutlineLoading3Quarters } = icons;

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
        <span>{constant.dont_have_account}</span>
        <button className="sign-up-button" onClick={() => goSignUp()}>
          {constant.sign_up}
        </button>
      </div>
      <div className="title col-4 mx-auto">{constant.app_name}</div>
      <div className="welcome col-4 mx-auto">{constant.hello}</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>{constant.email}</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>{constant.password}</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">{constant.forgot_password}</span>
        <div>
          <button
            className="btn-submit"
            disabled={isLoading}
            onClick={() => {}}
          >
            {isLoading === true && (
              <AiOutlineLoading3Quarters className="loading-icon" />
            )}
            <span> {constant.log_in_chart_app}</span>
          </button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => goHomepage()}>
            &#60; {constant.go_to_homepage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
