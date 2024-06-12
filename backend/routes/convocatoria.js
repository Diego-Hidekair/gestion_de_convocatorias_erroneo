// backend/routes/convocatoria.js
const express = require('express');
const { getConvocatorias, getConvocatoriaById, createConvocatoria, updateConvocatoria, deleteConvocatoria } = require('../controllers/convocatoriaController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getConvocatorias);
router.get('/:id', authenticate, getConvocatoriaById);
router.post('/', authenticate, createConvocatoria);
router.put('/:id', authenticate, updateConvocatoria);
router.delete('/:id', authenticate, deleteConvocatoria);

module.exports = router;
