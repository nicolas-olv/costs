import React from "react";
import "./Project.css";

function Project(props) {
  return (
    <div className="project">
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <button onClick={props.delete}>Deletar</button>
    </div>
  );
}

export default Project;
