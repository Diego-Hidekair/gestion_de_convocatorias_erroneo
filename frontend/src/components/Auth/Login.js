// src/components/Auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [userData, setUserData] = useState({
    correo: '',
    contraseña: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', userData);
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-container">
      <h2>Inicio de Sesión</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
