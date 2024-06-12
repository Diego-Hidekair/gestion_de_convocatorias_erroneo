// src/components/ConvocatoriaDetail.js
import React, { useEffect, useState } from 'react';
import { getConvocatoriaById } from '../services/convocatoriaService';

const ConvocatoriaDetail = ({ convocatoriaId, token }) => {
  const [convocatoria, setConvocatoria] = useState(null);

  useEffect(() => {
    const fetchConvocatoria = async () => {
      try {
        const data = await getConvocatoriaById(convocatoriaId, token);
        setConvocatoria(data);
      } catch (error) {
        console.error('Error fetching convocatoria:', error);
      }
    };

    fetchConvocatoria();
  }, [convocatoriaId, token]);

  if (!convocatoria) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{convocatoria.titulo}</h1>
      <p>{convocatoria.descripcion}</p>
      <p>Facultad/Carrera: {convocatoria.facultad_carrera}</p>
      <p>Fecha de Publicación: {convocatoria.fecha_publicacion}</p>
    </div>
  );
};

export default ConvocatoriaDetail;
