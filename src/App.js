import React from "react";
import { useActiveSections } from "./hooks/useActiveSections";

import {
  About,
  Footer,
  Header,
  Skills,
  Testimonial,
  Work,
  Curriculum,
} from "./container";
import { NavBar } from "./components";
import "./App.scss";

const App = () => {
  const { activeSections, loading } = useActiveSections();

  if (loading) {
    return (
      <div className="app">
        <div className="app__loading">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <NavBar />
      <Header />
      {activeSections.about && <About />}
      {activeSections.work && <Work />}
      {activeSections.skills && <Skills />}
      {activeSections.curriculum && <Curriculum />}
      {activeSections.testimonial && <Testimonial />}
      <Footer />
    </div>
  );
};

export default App;
