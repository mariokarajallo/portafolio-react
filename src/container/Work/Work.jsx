import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [workCategories, setWorkCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener trabajos con múltiples categorías incluidas
        const worksQuery = `
          *[_type == "works" && isActive == true] {
            ...,
            showInAll,
            categories[]-> {
              name,
              order,
              isDefault,
              isActive
            }
          }
        `;
        const worksData = await client.fetch(worksQuery);

        // Obtener categorías de filtro (solo las activas)
        const categoriesQuery =
          '*[_type == "workCategories" && isActive == true] | order(order asc)';
        const categoriesData = await client.fetch(categoriesQuery);

        // Agregar la opción "All" al final si no existe una categoría default activa
        const allCategory = categoriesData.find(
          (cat) => cat.isDefault && cat.isActive
        );
        if (!allCategory) {
          categoriesData.push({
            name: "All",
            isDefault: true,
            order: categoriesData.length + 1,
          });
        }

        // Ordenar categorías
        const sortedCategories = categoriesData.sort(
          (a, b) => a.order - b.order
        );

        setWorks(worksData);

        // Aplicar filtro inicial - solo mostrar trabajos que aparecen en "All"
        const initialFilteredWorks = worksData.filter(
          (work) => work.showInAll === true
        );
        setFilterWork(initialFilteredWorks);

        setWorkCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        // Solo mostrar trabajos que tengan showInAll = true
        setFilterWork(works.filter((work) => work.showInAll === true));
      } else {
        // Filtrar por categoría específica
        setFilterWork(
          works.filter(
            (work) =>
              work.categories &&
              work.categories.some((category) => category?.name === item)
          )
        );
      }
    }, 500);
  };

  if (loading) {
    return (
      <div className="app__works app__flex">
        <p>Cargando...</p>
      </div>
    );
  }

  if (works.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="head-text">
        {" "}
        My Creative <span>Portfolio</span> Section
      </h2>

      <div className="app__work-filter">
        {workCategories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(category.name)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === category.name ? "item-active" : ""
            }`}
          >
            {category.name}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              {work.imgUrl && <img src={urlFor(work.imgUrl)} alt={work.name} />}

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>

                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description}
              </p>

              {/* Mostrar las categorías del trabajo */}
              {work.categories && work.categories.length > 0 && (
                <div
                  className="app__work-categories app__flex"
                  style={{ marginTop: 10 }}
                >
                  {work.categories.map((category, index) => (
                    <span key={index} className="app__work-category-item">
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Tags movidos después del título y descripción */}
              <div className="app__work-tags app__flex">
                {work.tags &&
                  work.tags.map((tag, index) => (
                    <span key={index} className="app__work-tag-item">
                      {tag}
                    </span>
                  ))}
              </div>

              <div className="app__link-mobil">
                <div>
                  <a href={work.projectLink} target="_blank" rel="noreferrer">
                    <motion.div>
                      <AiFillEye />
                    </motion.div>
                  </a>
                </div>
                <div>
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div>
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
