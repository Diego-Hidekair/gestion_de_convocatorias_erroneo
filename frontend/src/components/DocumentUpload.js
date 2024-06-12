// src/components/DocumentUpload.js
import React, { useState } from 'react';
import { uploadDocument } from '../services/documentService';

const DocumentUpload = ({ convocatoriaId, token }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('convocatoriaId', convocatoriaId);

    try {
      await uploadDocument(formData, token);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error uploading document');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUpload;
