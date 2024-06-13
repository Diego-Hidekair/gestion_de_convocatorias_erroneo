// src/pages/DocumentoFormPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentoFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
      nombre: '',
      tipo: '',
      estado: 'pendiente',
      convocatoria_id: '',
      usuario_id: '',
      filePath: ''
    });

    useEffect(() => {
        if (id) {
          const fetchDocumento = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/documentos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              setFormData(response.data);
            } catch (error) {
              console.error('Error al obtener el documento:', error);
            }
          };
          fetchDocumento();
        }
      }, [id, token]);

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };

    const handleFileChange = (e) => {
    setFormData({
        ...formData,
        filePath: e.target.files[0]
    });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFile = new FormData();
      Object.keys(formData).forEach(key => {
        formDataWithFile.append(key, formData[key]);
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };

      if (id) {
        await axios.put(`http://localhost:5000/documentos/${id}`, formDataWithFile, config);
      } else {
        await axios.post('http://localhost:5000/documentos', formDataWithFile, config);
      }
      navigate('/documentos');
    } catch (error) {
      console.error('Error al guardar el documento:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Documento' : 'Crear Documento'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo</label>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </select>
        </div>
        <div>
          <label>ID de Convocatoria</label>
          <input
            type="text"
            name="convocatoria_id"
            value={formData.convocatoria_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ID de Usuario</label>
          <input
            type="text"
            name="usuario_id"
            value={formData.usuario_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Archivo</label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default DocumentoFormPage;
