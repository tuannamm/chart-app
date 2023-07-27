import React, { memo } from "react";
import "./profile.scss";

import icons from "../../utils/icons";

const { FiMail, BiUser, BsTelephone, IoCreateOutline } = icons;

const Profile = (props) => {
  return (
    <div className="profile-container">
      <form>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-4  col-form-label">
            <FiMail className="icon" />
            Email:
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail"
              defaultValue="nttnnam@gmail.com"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
            <BiUser className="icon" />
            Username:
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail"
              defaultValue="Tuan Nam"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
            <BsTelephone className="icon" />
            Phone:
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail"
              defaultValue="0909771924"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-4 col-form-label">
            <IoCreateOutline className="icon" />
            Created at:
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail"
              defaultValue="22/06/2023"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(Profile);
