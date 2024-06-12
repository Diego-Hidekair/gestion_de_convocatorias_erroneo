// backend/models/HistorialDocumento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const HistorialDocumento = sequelize.define('HistorialDocumento', {
  accion: {
    type: DataTypes.ENUM('creado', 'modificado', 'aprobado', 'rechazado', 'eliminado'),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'historial_documentos',
  timestamps: false,
});

module.exports = HistorialDocumento;
