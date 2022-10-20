import React from "react";
import { Link } from "react-router-dom";
import "./LinkButton.css";

function LinkButton({ to, text }) {
  return (
    <Link to={to} className="btn">
      {text}
    </Link>
  );
}

export default LinkButton;
