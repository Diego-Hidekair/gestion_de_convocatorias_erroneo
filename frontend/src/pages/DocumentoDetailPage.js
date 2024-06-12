// src/pages/DocumentoDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentoDetailPage = ({ token }) => {
  const { id } = useParams();
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumento = async () => {
      try {
        const response = await axios.get(`/api/documentos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDocumento(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el documento:', error);
        setLoading(false);
      }
    };

    fetchDocumento();
  }, [id, token]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!documento) {
    return <div>Documento no encontrado</div>;
  }

  return (
    <div>
      <h1>{documento.nombre}</h1>
      <p>Tipo: {documento.tipo}</p>
      <p>Estado: {documento.estado}</p>
      <p>Fecha de carga: {new Date(documento.fecha_carga).toLocaleDateString()}</p>
      <a href={documento.filePath} download>Descargar archivo</a>
    </div>
  );
};

export default DocumentoDetailPage;
