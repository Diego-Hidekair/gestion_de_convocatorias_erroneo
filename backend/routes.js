// backend/routes.js

const express = require('express');
const router = express.Router();
const convocatoriaController = require('./controllers/convocatoriaController');
const usuarioController = require('./controllers/usuarioController');
const { authenticate, authorize } = require('./middleware/authMiddleware');

// Rutas de convocatorias
router.get('/convocatorias', convocatoriaController.getAllConvocatorias);
router.post('/convocatorias', authenticate, authorize(['administrador', 'decanato']), convocatoriaController.createConvocatoria);

// Rutas de usuarios
router.post('/usuarios/login', usuarioController.login);
router.post('/usuarios/register', usuarioController.register);

module.exports = router;
