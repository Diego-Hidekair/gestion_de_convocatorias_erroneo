// backend/controllers/userController.js
const Usuario = require('../models/Usuario');

const getProfile = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.user.id, {
      attributes: ['id', 'nombre', 'correo', 'rol']
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { nombre, correo } = req.body;
    const user = await Usuario.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    user.nombre = nombre || user.nombre;
    user.correo = correo || user.correo;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil del usuario' });
  }
};

module.exports = { getProfile, updateProfile };