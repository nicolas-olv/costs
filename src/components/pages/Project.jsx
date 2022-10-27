import React, { useState, useEffect } from "react";
import styles from "./Project.module.css";

import { v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";
import Message from "../layout/Message";

function Project() {
  const id = useParams().id;

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, [id]);

  function createService(project) {
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;
    project.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);
    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso");
        setType("success");
      })
      .catch((error) => console.log(error));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function editPost(project) {
    setMessage("");

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto atualizado!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <div className={styles.project_header}>
                <h1>Projeto: {project.name}</h1>
                <button onClick={toggleProjectForm} className={styles.btn}>
                  {!showProjectForm ? "Editar projeto" : "Fechar"}
                </button>
              </div>
              {!showProjectForm ? (
                <div>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText={"Concluir edição"}
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <div className={styles.project_header}>
                <h2>Adicione um serviço:</h2>
                <button onClick={toggleServiceForm} className={styles.btn}>
                  {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                </button>
              </div>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serciços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
