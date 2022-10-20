import React from "react";
import Project from "../Project";
import projectList from "../../data/projects.json";
import { useState } from "react";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState(projectList);

  function deleteProject(id) {
    setProjects(projects.filter((project) => project.id !== id));
  }

  return (
    <div className="projects">
      {projects.length > 0 ? (
        projects.map((project) => (
          <Project
            key={project.id}
            title={project.title}
            description={project.description}
            delete={() => deleteProject(project.id)}
          />
        ))
      ) : (
        <p>Sem projetos cadastrados</p>
      )}
    </div>
  );
}

export default Projects;
