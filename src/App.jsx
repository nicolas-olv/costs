import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Company from "./pages/Company";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";

import Container from "./layout/Container";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/contact">Contato</Link>
          <Link to="/company">Empresa</Link>
          <Link to="/newproject">Novo Projeto</Link>
        </ul>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company" element={<Company />} />
            <Route path="/newproject" element={<NewProject />} />
          </Routes>
        </Container>
        <p>footer</p>
      </BrowserRouter>
    </div>
  );
}

export default App;
