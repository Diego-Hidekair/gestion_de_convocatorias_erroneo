// src/services/convocatoriaService.js
import axios from 'axios';

export const getConvocatoriaById = async (id, token) => {
  try {
    const response = await axios.get(`http://localhost:5000/convocatorias/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching convocatoria:', error);
    throw error;
  }
};
