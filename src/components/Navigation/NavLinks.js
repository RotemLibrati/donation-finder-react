import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/donation/addDonation">הוסף מקום תרומה</NavLink>
    </li>
    <li>
     <NavLink to="/" exact>חפש מיקום תרומה</NavLink>
    </li>
  </ul>
};

export default NavLinks;