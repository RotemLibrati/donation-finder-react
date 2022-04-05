import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Add Donation</NavLink>
    </li>
    <li>
      <NavLink to="/donation/search">Search Donation</NavLink>
    </li>
  </ul>
};

export default NavLinks;