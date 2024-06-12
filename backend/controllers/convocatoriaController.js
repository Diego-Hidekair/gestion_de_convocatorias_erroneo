// backend/controllers/convocatoriaController.js
const Convocatoria = require('../models/Convocatoria');

const createConvocatoria = async (req, res) => {
  try {
    const { codigo, titulo, descripcion, fecha_publicacion, facultad_carrera } = req.body;
    const newConvocatoria = await Convocatoria.create({
      codigo,
      titulo,
      descripcion,
      fecha_publicacion,
      facultad_carrera
    });
    res.status(201).json(newConvocatoria);
  } catch (error) {
    console.error('Error al crear convocatoria:', error);
    res.status(500).json({ error: 'Error al crear convocatoria' });
  }
};

const updateConvocatoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, titulo, descripcion, fecha_publicacion, facultad_carrera } = req.body;
    const convocatoria = await Convocatoria.findByPk(id);
    if (!convocatoria) {
      return res.status(404).json({ error: 'Convocatoria no encontrada' });
    }
    convocatoria.codigo = codigo;
    convocatoria.titulo = titulo;
    convocatoria.descripcion = descripcion;
    convocatoria.fecha_publicacion = fecha_publicacion;
    convocatoria.facultad_carrera = facultad_carrera;
    await convocatoria.save();
    res.json(convocatoria);
  } catch (error) {
    console.error('Error al actualizar convocatoria:', error);
    res.status(500).json({ error: 'Error al actualizar convocatoria' });
  }
};

const getConvocatorias = async (req, res) => {
  try {
    const convocatorias = await Convocatoria.findAll();
    res.json(convocatorias);
  } catch (error) {
    console.error('Error al obtener convocatorias:', error);
    res.status(500).json({ error: 'Error al obtener convocatorias' });
  }
};

const getConvocatoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const convocatoria = await Convocatoria.findByPk(id);
    if (!convocatoria) {
      return res.status(404).json({ error: 'Convocatoria no encontrada' });
    }
    res.json(convocatoria);
  } catch (error) {
    console.error('Error al obtener convocatoria:', error);
    res.status(500).json({ error: 'Error al obtener convocatoria' });
  }
};

const deleteConvocatoria = async (req, res) => {
  try {
    const { id } = req.params;
    const convocatoria = await Convocatoria.findByPk(id);
    if (!convocatoria) {
      return res.status(404).json({ error: 'Convocatoria no encontrada' });
    }
    await convocatoria.destroy();
    res.json({ message: 'Convocatoria eliminada' });
  } catch (error) {
    console.error('Error al eliminar convocatoria:', error);
    res.status(500).json({ error: 'Error al eliminar convocatoria' });
  }
};

module.exports = { getConvocatorias, getConvocatoriaById, createConvocatoria, updateConvocatoria, deleteConvocatoria};