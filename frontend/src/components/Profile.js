// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    nombre: '',
    correo: '',
    rol: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/users/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setUser(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError('Error al cargar el perfil');
      setLoading(false);
    });
  }, []);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put('http://localhost:5000/users/profile', user, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      alert('Perfil actualizado exitosamente');
    })
    .catch(error => {
      setError('Error al actualizar el perfil');
    });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

 return (
    <div>
      <h1>Perfil de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={user.correo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rol:</label>
          <input
            type="text"
            name="rol"
            value={user.rol}
            disabled
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default Profile;
