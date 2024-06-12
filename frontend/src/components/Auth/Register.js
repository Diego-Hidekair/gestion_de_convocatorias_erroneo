// src/components/Auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: 'docente' // O el rol predeterminado que desees
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', userData);
      console.log(response.data);
      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={userData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={userData.correo}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={userData.contraseña}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
