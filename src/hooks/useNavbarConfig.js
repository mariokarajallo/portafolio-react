import { useState, useEffect } from "react";
import { client } from "../client";

export const useNavbarConfig = () => {
  const [navbarConfig, setNavbarConfig] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavbarConfig = async () => {
      try {
        const query = `*[_type == "navbarConfig"][0]{
          navItems[]{
            id,
            displayName,
            isActive
          }
        }`;

        const data = await client.fetch(query);

        if (data && data.navItems) {
          setNavbarConfig(data.navItems);
        } else {
          // Configuración por defecto si no hay datos
          setNavbarConfig([
            { id: "home", displayName: "Home", isActive: true },
            { id: "about", displayName: "About", isActive: true },
            { id: "work", displayName: "Work", isActive: true },
            { id: "skills", displayName: "Skills", isActive: true },
            { id: "curriculum", displayName: "Curriculum", isActive: true },
            { id: "testimonial", displayName: "Testimonial", isActive: true },
            { id: "brands", displayName: "Brands", isActive: true },
            { id: "contact", displayName: "Contact", isActive: true },
          ]);
        }
      } catch (error) {
        console.error("Error fetching navbar config:", error);
        // Configuración por defecto en caso de error
        setNavbarConfig([
          { id: "home", displayName: "Home", isActive: true },
          { id: "about", displayName: "About", isActive: true },
          { id: "work", displayName: "Work", isActive: true },
          { id: "skills", displayName: "Skills", isActive: true },
          { id: "curriculum", displayName: "Curriculum", isActive: true },
          { id: "testimonial", displayName: "Testimonial", isActive: true },
          { id: "brands", displayName: "Brands", isActive: true },
          { id: "contact", displayName: "Contact", isActive: true },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarConfig();
  }, []);

  return { navbarConfig, loading };
};
