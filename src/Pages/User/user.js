import React from "react";
import "./user.scss";

import Header from "../../components/Header/Header";
import Avatar from "../../components/Avatar/Avatar";
import Profile from "../../components/Profile/Profile";

import icons from "../../utils/icons";
import constant from "../../utils/constant";

const { FiSettings } = icons;

const User = () => {
  return (
    <div className="user-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="content-container">
        <div className="chart-list-table"></div>
        <div className="user-profile">
          <div className="header-profile">
            <h1>{constant.user_profile}</h1>
            <button>
              {constant.edit} <FiSettings />
            </button>
          </div>
          <div className="user-avatar">
            <Avatar />
          </div>
          <div className="user-information">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
