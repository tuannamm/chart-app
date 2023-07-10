import React from "react";

const Switch = ({ title, onChange, state }) => {
  return (
    <div className="form-check form-switch">
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {title}
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
        onChange={onChange}
      />
    </div>
  );
};

export default Switch;
