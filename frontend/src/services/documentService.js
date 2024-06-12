// src/services/documentService.js
import axios from 'axios';

export const uploadDocument = async (formData, token) => {
  try {
    const response = await axios.post(`http://localhost:5000/documentos`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};
