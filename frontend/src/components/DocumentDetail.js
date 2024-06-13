import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentDetail = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/documentos/${id}`);
        setDocument(response.data);
      } catch (error) {
        console.error('Error al obtener el documento:', error);
      }
    };
    fetchDocument();
  }, [id]);

  if (!document) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Detalles del Documento</h2>
      <p><strong>Nombre:</strong> {document.nombre}</p>
      <p><strong>Tipo:</strong> {document.tipo}</p>
      <p><strong>Fecha de Carga:</strong> {new Date(document.fecha_carga).toLocaleDateString()}</p>
      <p><strong>Estado:</strong> {document.estado}</p>
      <p><strong>ID de Convocatoria:</strong> {document.convocatoria_id}</p>
      <p><strong>ID de Usuario:</strong> {document.usuario_id}</p>
      <p><strong>Ruta del Archivo:</strong> {document.filePath}</p>
    </div>
  );
};

export default DocumentDetail;
