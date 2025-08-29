import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Testimonial.scss";

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials" && isActive == true]';
    const brandsQuery = '*[_type == "brands" && isActive == true]';

    Promise.all([client.fetch(query), client.fetch(brandsQuery)])
      .then(([testimonialsData, brandsData]) => {
        setTestimonials(testimonialsData);
        setBrands(brandsData);
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
      <div className="app__testimonial app__flex">
        <p>Cargando...</p>
      </div>
    );
  }

  // Solo mostrar si hay testimonios activos
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="head-text">Testimonials</h2>

      {testimonials.length > 0 && (
        <>
          <div className="app__testimonial-item app__flex">
            {testimonials[currentIndex]?.imgUrl && (
              <img
                src={urlFor(testimonials[currentIndex].imgUrl)}
                alt={testimonials[currentIndex].name}
              />
            )}
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex]?.feedback}</p>
              <div>
                <h4 className="bold-text">
                  {testimonials[currentIndex]?.name}
                </h4>
                <h5 className="p-text">
                  {testimonials[currentIndex]?.company}
                </h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      {brands.length > 0 && (
        <div className="app__testimonial-brands app__flex">
          {brands.map((brand) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, type: "tween" }}
              key={brand._id}
            >
              {brand.imgUrl && (
                <img src={urlFor(brand.imgUrl)} alt={brand.name} />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
