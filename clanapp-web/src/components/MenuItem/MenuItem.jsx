import React from "react";
import "./MenuItem.scss";
import { Link, useHistory } from "react-router-dom";

export default function MenuItem({ Icon, title }) {
  return (
    <div className="MenuItem">
      {Icon && <Icon className="menuItem_icon" />}
      <Link to={`/panel/${title}`}>{title}</Link>
    </div>
  );
}
