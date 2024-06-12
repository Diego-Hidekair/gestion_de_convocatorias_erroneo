// backend/controllers/authController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { nombre, contraseña, correo, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const newUser = await Usuario.create({
      nombre,
      contraseña: hashedPassword,
      correo,
      rol
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const user = await Usuario.findOne({ where: { correo } });
    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return res.status(401).json({ error: 'Correo o contraseña inválidos' });
    }
    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };
