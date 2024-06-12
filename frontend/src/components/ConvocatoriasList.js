// src/components/ConvocatoriasList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ConvocatoriasList = ({ token }) => {
  const [convocatorias, setConvocatorias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/convocatorias', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setConvocatorias(response.data);
    })
    .catch(error => {
      console.error('Error fetching convocatorias:', error);
    });
  }, [token]);

  return (
    <div>
      <h1>Convocatorias</h1>
      <Link to="/convocatorias/nueva">Crear nueva convocatoria</Link>
      <ul>
        {convocatorias.map(convocatoria => (
          <li key={convocatoria.id}>
            <Link to={`/convocatorias/${convocatoria.id}`}>{convocatoria.titulo}</Link>
            <Link to={`/convocatorias/editar/${convocatoria.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConvocatoriasList;
