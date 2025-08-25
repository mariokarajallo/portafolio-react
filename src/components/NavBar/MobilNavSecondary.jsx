import React from "react";
import "./MobilNavSecondary.scss";

const MobilNavSecondary = ({ navItems, toggle, setToggle }) => {
  return (
    <div className="mobile-nav">
      {/* Header con nombre e icono de hamburguesa */}
      <div className="mobile-nav__header">
        <button
          className="mobile-nav__hamburger"
          onClick={() => setToggle(!toggle)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${toggle ? "active" : ""}`}></span>
          <span className={`hamburger-line ${toggle ? "active" : ""}`}></span>
          <span className={`hamburger-line ${toggle ? "active" : ""}`}></span>
        </button>
      </div>

      {/* Menú desplegable */}
      <div className={`mobile-nav__menu ${toggle ? "active" : ""}`}>
        <ul className="mobile-nav__list">
          {navItems.map((item, index) => (
            <li key={index} className="mobile-nav__item">
              <a
                href={`#${item}`}
                className="mobile-nav__link"
                onClick={() => setToggle(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobilNavSecondary;
