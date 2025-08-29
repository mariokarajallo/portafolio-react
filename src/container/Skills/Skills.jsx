import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type=="experiences" && isActive == true]';
    const skillsQuery = '*[_type =="skills" && isActive == true]';

    Promise.all([client.fetch(query), client.fetch(skillsQuery)])
      .then(([experiencesData, skillsData]) => {
        setExperiences(experiencesData);
        setSkills(skillsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="app__skills app__flex">
        <p>Cargando...</p>
      </div>
    );
  }

  // Solo mostrar si hay datos activos
  if (skills.length === 0 && experiences.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        {/* icon skills */}
        {skills.length > 0 && (
          <motion.div className="app__skills-list">
            {skills.map((skill) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__skills-item app__flex"
                key={skill.name}
              >
                <div
                  className="app__flex"
                  style={{ backgroundColor: skill.bgColor }}
                >
                  {skill.icon && (
                    <img src={urlFor(skill.icon)} alt={skill.name} />
                  )}
                </div>
                <p className="p-text">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* experiences */}
        {experiences.length > 0 && (
          <div className="app__skills-exp">
            {experiences.map((experience) => (
              <motion.div
                className="app__skills-exp-item"
                key={experience.year}
              >
                <div className="app__skills-exp-year">
                  <p className="bold-text">{experience.year}</p>
                </div>
                <motion.div className="app__skills-exp-works">
                  {experience.works.map((work, index) => (
                    <React.Fragment key={`${work.name}-${index}`}>
                      <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className="app__skills-exp-work"
                        data-tip
                        data-for={work.name}
                      >
                        <h4 className="bold-text">{work.name}</h4>
                        <p className="p-text">{work.company}</p>
                      </motion.div>
                    </React.Fragment>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
