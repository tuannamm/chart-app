import "./header.scss";

import NavBar from "../Navbar";
import { memo } from "react";

const Header = () => {
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default memo(Header);
