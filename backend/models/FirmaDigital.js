// backend/models/FirmaDigital.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const FirmaDigital = sequelize.define('FirmaDigital', {
  fecha_firma: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  firma: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'firmas_digitales',
  timestamps: false,
});

module.exports = FirmaDigital;
