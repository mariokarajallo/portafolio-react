// Importaciones necesarias
import React from "react";
import { motion } from "framer-motion"; // Para animaciones

import { AppWrap } from "../../wrapper"; // HOC para envolver el componente
import { images } from "../../constants"; // Constantes de imágenes
import "./Header.scss"; // Estilos del componente

// Configuración de animación para escalado
// Define cómo se animarán los círculos de tecnologías
const scaleVariants = {
  whileInView: {
    scale: [0, 1], // Escala de 0 a 1 (invisible a visible)
    opacity: [0, 1], // Opacidad de 0 a 1 (transparente a opaco)
    transition: {
      duration: 1, // Duración de 1 segundo
      ease: "easeInOut", // Tipo de transición suave
    },
  },
};

const Header = () => {
  return (
    // Contenedor principal del header con ID para navegación
    <div id="home" className="app__header app__flex">
      {/* BLOQUE 1: Información personal y presentación */}
      {/* Animación: se desliza desde la izquierda (-100px) y aparece gradualmente */}
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          {/* Badge de saludo con emoji y nombre */}
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Mario</h1>
            </div>
          </div>

          {/* Tags de descripción profesional */}
          <div className="tag-cmp app__flex">
            <p className="p-text">Full-Stack</p>
            <p className="p-text">
              (I enjoy backend, but frontend is where my heart truly lies)
            </p>
            <p className="p-text">Software Engineer</p>
          </div>
        </div>
      </motion.div>

      {/* BLOQUE 2: Imagen de perfil */}
      {/* Animación: aparece gradualmente con un delay para los elementos hijos */}
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        {/* Imagen principal de perfil */}
        <img src={images.profile2} alt="profile_bg" />

        {/* Círculo decorativo que se escala desde 0 */}
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          src={images.circle}
          alt="profile_circle"
          className="overlay_circle"
        />
      </motion.div>

      {/* BLOQUE 3: Círculos de tecnologías */}
      {/* Animación: usa scaleVariants para escalar y aparecer gradualmente */}
      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {/* Mapea las imágenes de tecnologías (JS, React, Python) */}
        {[images.javascript, images.react, images.python].map(
          (circle, index) => (
            <div className="circle-cmp app__flex" key={`circle-${index}`}>
              <img src={circle} alt="circle" />
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

// Exporta el componente envuelto en AppWrap con el ID "home"
export default AppWrap(Header, "home");
