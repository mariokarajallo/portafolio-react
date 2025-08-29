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
          buttonText,
          "pdfUrl": pdfFile.asset->url
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

  const handleDownloadCV = () => {
    if (curriculumData?.pdfUrl) {
      // Opción 1: Descarga directa con fallback a nueva pestaña
      const link = document.createElement("a");
      link.href = curriculumData.pdfUrl;
      link.download = "cv-mario-karajallo.pdf";
      link.target = "_blank"; // Abre en nueva pestaña si la descarga no funciona
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
    return null; // No mostrar nada si no hay datos
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
            "Would you like to learn more about my experience?"}
        </h2>

        <div className="app__curriculum-description">
          <p className="p-text">
            {curriculumData.description ||
              "Download my complete resume to learn all the details about my professional experience, projects, and technical skills."}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadCV}
          className="app__curriculum-button"
          disabled={!curriculumData.pdfUrl}
        >
          <span></span>
          <span>{curriculumData.buttonText || "Download Resume"}</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AppWrap(Curriculum, "curriculum");
