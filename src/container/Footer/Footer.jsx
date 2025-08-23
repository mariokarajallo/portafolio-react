import React, { useState } from "react";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import emailjs from "@emailjs/browser";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: username,
      email: email,
      message: message,
    };

    // Configurar EmailJS con todos los parámetros que espera tu plantilla
    const emailjsParams = {
      from_name: username,
      from_email: email,
      message: message,
      email: email, // Agregar este parámetro que espera tu plantilla
    };

    // Enviar a Sanity y EmailJS en paralelo
    Promise.all([
      // Guardar en Sanity
      client.create(contact),
      // Enviar email con EmailJS
      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        emailjsParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      ),
    ])
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
        console.log(
          "✅ Mensaje guardado en Sanity y email enviado exitosamente"
        );
      })
      .catch((err) => {
        setLoading(false);
        console.error("❌ Error al enviar mensaje:", err);
      });
  };

  return (
    <>
      <h2 className="head-text">Take a coffe & chat with me </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:mario@karajallo.com" className="p-text">
            mario@karajallo.com
          </a>
        </div>
        <a
          href="https://wa.me/595985743672?text=Hi%20Mario!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
          className="app__footer-card"
          target="_blank"
          rel="noreferrer"
        >
          <img src={images.mobile} alt="phone" />
          <span className="p-text">+595 985 743672</span>
        </a>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="username"
              value={username}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>

          <button type="button" className="p-text" onClick={handleSubmit}>
            {!loading ? "Send Message" : "Sending..."}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch</h3>
        </div>
      )}
      <div className="app__social-footer" target="_blank" rel="noreferrer">
        <div>
          <a href="https://github.com/mariokarajallo">
            <FaGithub />
          </a>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/mariokarajallo/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </div>
        <div>
          <a
            href="https://twitter.com/Mariokarajallo"
            target="_blank"
            rel="noreferrer"
          >
            <BsTwitter />
          </a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/mariokarajallo"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram />
          </a>
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
