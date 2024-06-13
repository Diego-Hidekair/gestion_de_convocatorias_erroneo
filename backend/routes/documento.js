// backend/routes/documento.js
const express = require('express');
const multer = require('multer');
const { uploadDocumento, getDocumentoByConvocatoriaId, deleteDocumentoById, getDocumentoById, createDocumento, updateDocumento } = require('../controllers/documentoController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', authenticate, upload.single('file'), uploadDocumento);
router.get('/convocatoria/:convocatoriaId', authenticate, getDocumentoByConvocatoriaId);
router.delete('/:id', authenticate, deleteDocumentoById); 
router.get('/:id', authenticate, getDocumentoById);
router.post('/', authenticate, createDocumento);
router.put('/:id', authenticate, updateDocumento);

module.exports = router;
