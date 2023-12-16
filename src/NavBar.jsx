import React from "react";
import { Link } from "react-router-dom"; // If you're using react-router for navigation

export const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"> Complexes | </Link>
          <Link to="/owners"> Owner Directory | </Link>
          <Link to="/tenants"> Tenant Directory </Link>
        </li>
      </ul>
    </nav>
  );
};
