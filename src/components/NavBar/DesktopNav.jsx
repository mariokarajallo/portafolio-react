import React from "react";
import "./DesktopNav.scss";

const DesktopNav = ({ navItems }) => {
  return (
    <ul className="app__navbar-links">
      {navItems.map((item) => (
        <li className="app__flex p-text" key={`desktop-link-${item}`}>
          <div />
          <a href={`#${item}`}>{item}</a>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNav;
