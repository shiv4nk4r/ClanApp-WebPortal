import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="navButtons"></div>
      <div className="searchBar"></div>
      <div className="help"></div>
    </div>
  );
}

export default Header;
