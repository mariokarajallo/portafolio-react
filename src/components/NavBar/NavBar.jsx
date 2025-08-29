import React, { useState } from "react";
import { images } from "../../constants";
import { useActiveSections } from "../../hooks/useActiveSections";
import { useNavbarConfig } from "../../hooks/useNavbarConfig";
import DesktopNav from "./DesktopNav";
// import MobilNavSecondary from "./MobilNavSecondary";
import MobilNav from "./MobileNav";
import "./NavBar.scss";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const { activeSections, loading: sectionsLoading } = useActiveSections();
  const { navbarConfig, loading: configLoading } = useNavbarConfig();

  // Generar navItems dinámicamente basándose en la configuración y secciones activas
  const generateNavItems = () => {
    const items = [];

    navbarConfig.forEach((item) => {
      if (item.isActive) {
        // Para contact siempre está activo, para otros verificar activeSections
        if (item.id === "contact" || activeSections[item.id]) {
          items.push({
            id: item.id,
            displayName: item.displayName,
          });
        }
      }
    });

    return items;
  };

  const navItems = generateNavItems();

  // Mostrar loading mientras se cargan las secciones activas o la configuración
  if (sectionsLoading || configLoading) {
    return (
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <img src={images.logo2} alt="logo" className="logo-svg" />
        </div>
        <div className="app__navbar-loading">
          <p>Cargando...</p>
        </div>
      </nav>
    );
  }

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
