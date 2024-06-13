// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile';
import ConvocatoriaForm from './components/ConvocatoriaForm';
import ConvocatoriasList from './components/ConvocatoriasList';
import ConvocatoriaDetailPage from './pages/ConvocatoriaDetailPage';
import DocumentoDetailPage from './pages/DocumentoDetailPage';
import DocumentoFormPage from './pages/DocumentoFormPage'; 
import './styles/global.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/convocatorias" element={isAuthenticated ? <ConvocatoriasList token={token} /> : <Navigate to="/login" />} />
          <Route path="/convocatorias/nueva" element={isAuthenticated ? <ConvocatoriaForm token={token} /> : <Navigate to="/login" />} />
          <Route path="/convocatorias/:id" element={isAuthenticated ? <ConvocatoriaDetailPage token={token} /> : <Navigate to="/login" />} />
          <Route path="/convocatorias/editar/:id" element={isAuthenticated ? <ConvocatoriaForm token={token} /> : <Navigate to="/login" />} />
          <Route path="/documentos/:id" element={isAuthenticated ? <DocumentoDetailPage token={token} /> : <Navigate to="/login" />} />
          <Route path="/documentos/nuevo" element={isAuthenticated ? <DocumentoFormPage token={token} /> : <Navigate to="/login" />} />
          <Route path="/documentos/editar/:id" element={isAuthenticated ? <DocumentoFormPage token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
