import { useState } from "react";
import SideBar from "./sidebar";
import "./admin.scss";

import { Outlet } from "react-router-dom";

import icons from "../../utils/icons";

const { FaBars } = icons;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="admin-container">
        <div className="admin-sidebar">
          <SideBar collapsed={collapsed} />
        </div>
        <div className="admin-content">
          <div className="admin-header">
            {<FaBars onClick={() => setCollapsed(!collapsed)} />}
          </div>
          <div className="admin-main">{<Outlet />}</div>
        </div>
      </div>
    </>
  );
};

export default Admin;
