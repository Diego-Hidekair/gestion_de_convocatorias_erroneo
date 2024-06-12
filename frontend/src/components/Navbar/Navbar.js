// src/components/Navbar/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/convocatorias">Convocatorias</Link></li>
            <li><Link to="/convocatorias/nueva">Nueva Convocatoria</Link></li>
            <li><button onClick={handleLogout}>Cerrar sesión</button></li>
            <li><button onClick={handleLogout}>Cerrar sesión</button></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Registrarse</Link></li>
            <li><Link to="/login">Iniciar sesión</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

