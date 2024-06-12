// backend/routes/documento.js
const express = require('express');
const { uploadDocumento, getDocumentoByConvocatoriaId, deleteDocumentoById } = require('../controllers/documentoController');
const { authenticate } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.post('/', authenticate, upload.single('file'), uploadDocumento); 
router.get('/convocatoria/:convocatoriaId', authenticate, getDocumentoByConvocatoriaId);
router.delete('/:id', authenticate, deleteDocumentoById); 
/*
router.post('/', authenticate, uploadDocumento);
router.get('/convocatoria/:convocatoriaId', authenticate, getDocumentoByConvocatoriaId);
*/
module.exports = router;
