// login.js (backend)
const express = require('express');
const Usuario = require('../backend/models/usuario');  // Modelo de Usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ error: 'Por favor, complete todos los campos' });
    }

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }

        const esValida = await usuario.compararContraseña(contraseña);
        if (!esValida) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión' });
    }
});

module.exports = router;
