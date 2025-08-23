import React from "react";
import { NavigationDots, SocialMedia } from "../components";

const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    // Obtener el año actual automáticamente
    const currentYear = new Date().getFullYear();

    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />
        <div className="app__wrapper app__flex">
          <Component />

          {/* Solo mostrar copyright en la sección de contacto */}
          {idName === "contact" && (
            <div className="copyright">
              <p className="p-text">@{currentYear} MARIO KARAJALLO</p>
              <p className="p-text">All rights reserved</p>
            </div>
          )}
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
