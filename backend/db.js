// backend/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', 
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a PostgreSQL establecida correctamente.');
  })
  .catch(err => {
    console.error('No se puede conectar a la base de datos:', err);
  });

module.exports = sequelize;
