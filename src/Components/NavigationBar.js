import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faPlus } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/" className="navbar-brand">Home</Link>
      <Nav className="mr-auto">
        <Link to="/add" className="nav-link">
          <FontAwesomeIcon icon={faPlus} /> Ajouter Voiture
        </Link>
        <Link to="/list" className="nav-link">
          <FontAwesomeIcon icon={faCar} /> Liste Voiture
        </Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
