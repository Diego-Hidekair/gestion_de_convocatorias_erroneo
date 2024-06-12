// backend/controllers/documentoController.js
const Documento = require('../models/Documento');

const uploadDocumento = async (req, res) => {
  try {
    const { nombre, tipo, estado, convocatoria_id, usuario_id } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No se ha subido ningún archivo' });
    }
    const newDocumento = await Documento.create({
      nombre,
      tipo,
      estado,
      convocatoria_id,
      usuario_id,
      filePath: file.path // Guarda la ruta del archivo
    });

    res.status(201).json(newDocumento);
  } catch (error) {
    console.error('Error al subir documento:', error);
    res.status(500).json({ error: 'Error al subir documento' });
  }
};

const getDocumentoByConvocatoriaId = async (req, res) => {
  try {
    const documentos = await Documento.findAll({
      where: { convocatoria_id: req.params.convocatoriaId }
    });
    res.json(documentos);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({ error: 'Error al obtener documentos' });
  }
}; 

const deleteDocumentoById = async (req, res) => {
  try {
    const documento = await Documento.findByPk(req.params.id);
    if (!documento) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
    await documento.destroy();
    res.json({ message: 'Documento eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar documento' });
  }
};

module.exports = { uploadDocumento, getDocumentoByConvocatoriaId, deleteDocumentoById };
