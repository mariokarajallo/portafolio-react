import React from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import "./MobileNav.scss";

const MobileNav = ({ navItems, toggle, setToggle }) => {
  const closeModal = () => setToggle(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="mobile-nav-toggle"
        onClick={() => setToggle(true)}
        aria-label="Abrir menú de navegación"
      >
        <HiMenuAlt4 className="hamburger-icon" />
      </button>

      {/* Menú móvil */}
      {toggle && (
        <>
          {/* Overlay de fondo */}
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeModal}
          />

          {/* Menú principal */}
          <motion.div
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.4,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del menú */}
            <div className="mobile-menu-header">
              <h3 className="mobile-menu-title">Menú</h3>
              <button
                className="close-button"
                onClick={closeModal}
                aria-label="Cerrar menú"
              >
                <HiX className="close-icon" />
              </button>
            </div>

            {/* Contenido del menú */}
            <div className="mobile-menu-content">
              <nav>
                <ul className="mobile-nav-list">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={`mobile-link-${item.id}`}
                      className="mobile-nav-item"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={closeModal}
                        className="mobile-nav-link"
                      >
                        {item.displayName}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default MobileNav;
