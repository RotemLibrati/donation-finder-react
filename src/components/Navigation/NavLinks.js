import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/donation/addDonation">Add Donation</NavLink>
    </li>
    <li>
     <NavLink to="/" exact>Search Donation</NavLink>
    </li>
  </ul>
};

export default NavLinks;