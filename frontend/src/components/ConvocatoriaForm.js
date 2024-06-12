// src/components/ConvocatoriaForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ConvocatoriaForm = ({ token }) => {
    const [formData, setFormData] = useState({
      codigo: '',
      titulo: '',
      descripcion: '',
      fecha_publicacion: '',
      facultad_carrera: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (id) {
        axios.get(`http://localhost:5000/convocatorias/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching convocatoria:', error);
        });
      }
    }, [id, token]);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `http://localhost:5000/convocatorias/${id}` : 'http://localhost:5000/convocatorias';

    axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
        navigate('/convocatorias');
    })
    .catch(error => {
        console.error('Error saving convocatoria:', error);
    });
    };

    return (
    <form onSubmit={handleSubmit}>
        <div>
        <label>Código</label>
        <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} required />
        </div>
        <div>
        <label>Título</label>
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
        </div>
        <div>
        <label>Descripción</label>
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
        </div>
        <div>
        <label>Fecha de Publicación</label>
        <input type="date" name="fecha_publicacion" value={formData.fecha_publicacion} onChange={handleChange} />
        </div>
        <div>
        <label>Facultad/Carrera</label>
        <input type="text" name="facultad_carrera" value={formData.facultad_carrera} onChange={handleChange} required />
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'} Convocatoria</button>
    </form>
    );
};

export default ConvocatoriaForm;
