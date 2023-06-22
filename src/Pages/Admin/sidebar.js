import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGithub,
  FaRegLaughWink,
  FaChartPie,
} from "react-icons/fa";

import sidebarBg from "../../assets/chart.webp";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();

  const handleToHomepage = () => {
    navigate("/home");
  };
  return (
    <>
      <ProSidebar
        // image={true ? sidebarBg : false}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {
              <FaChartPie
                onClick={() => handleToHomepage()}
                size={"3em"}
                color={"00bfff"}
              />
            }

            <span
              onClick={() => handleToHomepage()}
              style={{ marginLeft: "20px", fontSize: "20px" }}
            >
              Chart App
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              suffix={<span className="badge red">Main</span>}
            >
              Dashboard
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu title="Feature" icon={<FaRegLaughWink />}>
              <MenuItem>Quản lý Users</MenuItem>
              <MenuItem>Quản lý Chart</MenuItem>
              <MenuItem>Quản lý Profile</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center", color: "black" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/tuannamm/quiz-app"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Tuan Nam's Github
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
