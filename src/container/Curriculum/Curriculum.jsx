import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { client } from "../../client";
import "./Curriculum.scss";

const Curriculum = () => {
  const [curriculumData, setCurriculumData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const query = `*[_type == "curriculum" && isActive == true][0]{
          title,
          description,
          buttonTexts,
          "cvFiles": {
            "english": cvFiles.english.asset->url,
            "spanish": cvFiles.spanish.asset->url
          }
        }`;

        const data = await client.fetch(query);
        setCurriculumData(data);
      } catch (error) {
        console.error("Error fetching curriculum data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculumData();
  }, []);

  const handleDownloadCV = (language) => {
    const pdfUrl = curriculumData?.cvFiles?.[language];
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `cv-mario-karajallo-${language}.pdf`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="app__curriculum app__flex">
        <div className="app__curriculum-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!curriculumData) {
    return null;
  }

  return (
    <div id="curriculum" className="app__curriculum app__flex">
      <motion.div
        whileInView={{ y: [100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__curriculum-content"
      >
        <h2 className="head-text">
          {curriculumData.title ||
            "¿Te gustaría conocer más sobre mi experiencia?"}
        </h2>

        <div className="app__curriculum-description">
          <p className="p-text">
            {curriculumData.description ||
              "Descarga mi currículum completo para conocer todos los detalles sobre mi experiencia profesional, proyectos y habilidades técnicas."}
          </p>
        </div>

        <div className="app__curriculum-buttons">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDownloadCV("english")}
            className="app__curriculum-button app__curriculum-button--english"
            disabled={!curriculumData?.cvFiles?.english}
          >
            <span>
              {curriculumData?.buttonTexts?.english || "Download CV (EN)"}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDownloadCV("spanish")}
            className="app__curriculum-button app__curriculum-button--spanish"
            disabled={!curriculumData?.cvFiles?.spanish}
          >
            <span>
              {curriculumData?.buttonTexts?.spanish || "Descargar CV (ES)"}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AppWrap(Curriculum, "curriculum");
