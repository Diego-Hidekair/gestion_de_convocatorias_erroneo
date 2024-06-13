import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    fecha_carga: '',
    estado: 'pendiente',
    convocatoria_id: '',
    usuario_id: '',
    filePath: ''
  });

  useEffect(() => {
    if (id) {
      const fetchDocument = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/documentos/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error al obtener el documento:', error);
        }
      };
      fetchDocument();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/documentos/${id}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/documentos', formData);
      }
      history.push('/');
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
          <label>Fecha de Carga</label>
          <input
            type="date"
            name="fecha_carga"
            value={formData.fecha_carga}
            onChange={handleChange}
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
            onChange={(e) => setFormData({ ...formData, filePath: e.target.files[0] })}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default DocumentForm;
