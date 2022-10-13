import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Company from "./pages/Company";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";

import Container from "./layout/Container";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Projects from "./pages/Projects";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Container className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company" element={<Company />} />
            <Route path="/newproject" element={<NewProject />} />
          </Routes>
        </Container>
        <Footer className="footer" />
      </BrowserRouter>
    </div>
  );
}

export default App;
