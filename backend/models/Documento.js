// backend/models/Documento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Convocatoria = require('./Convocatoria');
const Usuario = require('./Usuario');

const Documento = sequelize.define('Documento', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_carga: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
    allowNull: false
  },
  convocatoria_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Convocatoria,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'documentos'
  // timestamps: false,  // Agregar si es necesario
});

module.exports = Documento;
