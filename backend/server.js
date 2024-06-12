// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const convocatoriaRoutes = require('./routes/convocatoria');
const documentoRoutes = require('./routes/documento');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // Asegúrate de incluir alter: true para actualizar la estructura de la base de datos
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// Rutas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/convocatorias', convocatoriaRoutes);
app.use('/documentos', documentoRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});