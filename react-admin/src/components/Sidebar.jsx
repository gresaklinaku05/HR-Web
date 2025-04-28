import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h4 className="text-white p-3">Admin Panel</h4>
      <Nav className="flex-column px-3">
        <Nav.Link as={Link} to="/" className="text-white">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/employee" className="text-white">Menaxhimi i Puntoreve</Nav.Link>
        <Nav.Link as={Link} to="/departments" className="text-white">Menaxhimi i Departamenteve</Nav.Link>
        <Nav.Link as={Link} to="/roles" className="text-white">Menaxhimi i Roleve</Nav.Link>
        <Nav.Link as={Link} to="/reports" className="text-white">Statistikat dhe Raportet</Nav.Link>
        <Nav.Link as={Link} to="/salary" className="text-white">Menaxhimi i pagave</Nav.Link>
        <Nav.Link as={Link} to="/leave-requests" className="text-white">Menaxhimi i Kërkesave për Pushim</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;

