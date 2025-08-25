import React, { useState } from "react";
import { images } from "../../constants";
import DesktopNav from "./DesktopNav";
// import MobilNavSecondary from "./MobilNavSecondary";
import MobilNav from "./MobileNav";
import "./NavBar.scss";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  // Datos de navegación compartidos
  const navItems = ["home", "about", "work", "skills", "contact"];

  return (
    <nav className="app__navbar">
      {/* Logo compartido - solo visible en desktop */}
      <div className="app__navbar-logo">
        <img src={images.logo2} alt="logo" className="logo-svg" />
      </div>

      {/* Navegación de escritorio */}
      <DesktopNav navItems={navItems} />

      {/* Navegación móvil */}
      <MobilNav navItems={navItems} toggle={toggle} setToggle={setToggle} />
    </nav>
  );
};

export default NavBar;
