import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
//import {images} from '../../constants'
import "./About.scss";
import { urlFor, client } from "../../client";

// const abouts =[
//   {title: 'Web Develoment',  description: 'I am a good web developer', imgUrl:images.about01 },
//   {title: 'Frontend Development', description: 'I am a good web developer', imgUrl:images.about02},
//   {title: 'Backend Development', description: 'I am a good web developer', imgUrl:images.about03 },
//   {title: 'UI/UX', description: 'I am a good Backend', imgUrl: images.about04},
// ];

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "abouts" && isActive == true]';

    client
      .fetch(query)
      .then((data) => {
        setAbouts(data);
      })
      .catch((error) => {
        console.error("Error fetching abouts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="app__about app__flex">
        <p>Cargando...</p>
      </div>
    );
  }

  if (abouts.length === 0) {
    return null; // No mostrar la sección si no hay datos activos
  }

  return (
    <>
      <h2 className="head-text">
        {" "}
        I Know that <span> Good Development</span>
        <br />
        means<span> Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profiles-item"
            key={about.title + index}
          >
            {about.imgUrl && (
              <img src={urlFor(about.imgUrl)} alt={about.title} />
            )}
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
