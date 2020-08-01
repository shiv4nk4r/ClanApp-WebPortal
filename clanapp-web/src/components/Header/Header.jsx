import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="logo">
          <h1>CLAN APP</h1>
        </div>
        <div className="nav-bar">
          <ul>
            <li>
              <Link to="/">Analytics</Link>
            </li>
            <li>
              <Link to="/Chapter">Chapter</Link>
            </li>
            <li>
              <Link to="/User">User</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
