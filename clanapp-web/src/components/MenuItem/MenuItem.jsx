import React from "react";
import "./MenuItem.scss";
import { Link } from "react-router-dom";

export default function MenuItem({ Icon, title, link }) {
  return (
    <div className="MenuItem">
      {Icon && <Icon className="menuItem_icon" />}
      <Link to={link === "/" ? `/` : `/panel/${link}`}>{title}</Link>
    </div>
  );
}
