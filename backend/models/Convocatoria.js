// backend/models/Convocatoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Convocatoria = sequelize.define('Convocatoria', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  facultad_carrera: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'convocatorias',
  timestamps: true 
});

module.exports = Convocatoria;
