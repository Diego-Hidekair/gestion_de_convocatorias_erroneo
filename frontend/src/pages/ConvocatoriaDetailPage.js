// src/pages/ConvocatoriaDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ConvocatoriaDetail from '../components/ConvocatoriaDetail';
import DocumentUpload from '../components/DocumentUpload';

const ConvocatoriaDetailPage = ({ token }) => {
  const { id } = useParams();

  return (
    <div>
      <ConvocatoriaDetail convocatoriaId={id} token={token} />
      <DocumentUpload convocatoriaId={id} token={token} />
    </div>
  );
};

export default ConvocatoriaDetailPage;
