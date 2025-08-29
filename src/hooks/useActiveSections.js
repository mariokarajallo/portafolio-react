import { useState, useEffect } from "react";
import { client } from "../client";

export const useActiveSections = () => {
  const [activeSections, setActiveSections] = useState({
    about: false,
    work: false,
    skills: false,
    curriculum: false,
    testimonial: false,
    brands: false,
    contact: true, // El footer siempre está activo
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveSections = async () => {
      try {
        // Consulta para verificar si hay datos activos en cada sección
        const queries = {
          about: '*[_type == "abouts" && isActive == true][0]',
          work: '*[_type == "works" && isActive == true][0]',
          skills: '*[_type == "skills" && isActive == true][0]',
          curriculum: '*[_type == "curriculum" && isActive == true][0]',
          testimonial: '*[_type == "testimonials" && isActive == true][0]',
          brands: '*[_type == "brands" && isActive == true][0]',
          // No necesitamos consulta para contact ya que siempre está activo
        };

        const results = {
          contact: true, // El footer siempre está activo
        };

        for (const [section, query] of Object.entries(queries)) {
          try {
            const data = await client.fetch(query);
            results[section] = !!data; // Convierte a boolean
          } catch (error) {
            console.error(`Error fetching ${section}:`, error);
            results[section] = false;
          }
        }

        setActiveSections(results);
      } catch (error) {
        console.error("Error fetching active sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSections();
  }, []);

  return { activeSections, loading };
};
