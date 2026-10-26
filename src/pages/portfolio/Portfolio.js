import projectData from "./projectsData.json";
import Project from "../../components/Project";
import PageHeader from "../../components/PageHeader";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const filters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
];

const Portfolio = () => {
  const location = useLocation();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const visible = projectData.filter((project) =>
    filter === "live" ? Boolean(project.deployed) : true
  );

  return (
    <section className="portfolio container">
      <PageHeader title="Portfolio" description="Products I have designed, built, and shipped" />
      <div className="projectFilters">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={filter === item.id ? "filterBtn active" : "filterBtn"}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
            <span>
              {item.id === "live"
                ? projectData.filter((project) => project.deployed).length
                : projectData.length}
            </span>
          </button>
        ))}
      </div>
      <div className="row">
        <AnimatePresence>
        {visible.map((project) => (
          <Project
            key={project.id}
            id={project.id}
            title={project.title}
            technologies={project.technologies}
            image={project.image}
            color={project.bgcolor}
            github={project.github}
            deployed={project.deployed}
            portal={project.portal}
            role={project.role}
            description={project.description}
          />
        ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
