import React, { useState } from "react";
import { images } from "../../constants";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import "./NavBar.scss";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  // Datos de navegación compartidos
  const navItems = ["home", "about", "work", "skills", "contact"];

  return (
    <nav className="app__navbar">
      {/* Logo compartido */}
      <div className="app__navbar-logo">
        <img src={images.logo2} alt="logo" className="logo-svg" />
      </div>

      {/* Navegación de escritorio */}
      <DesktopNav navItems={navItems} />

      {/* Navegación móvil */}
      <MobileNav navItems={navItems} toggle={toggle} setToggle={setToggle} />
    </nav>
  );
};

export default NavBar;
