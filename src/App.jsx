import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";
import Projects from "./components/pages/Projects";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Project from "./components/pages/Project";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company" element={<Company />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/project/:id" element={<Project />} />
          </Routes>
        </Container>
        <Footer className="footer" />
      </BrowserRouter>
    </div>
  );
}

export default App;
