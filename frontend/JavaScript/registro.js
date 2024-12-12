// registro.js (backend)
const express = require('express');
const Usuario = require('../backend/models/usuario'); // Modelo de Usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Para generar el token JWT
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post('/registro', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ error: 'Por favor, complete todos los campos' });
    }

    try {
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
        await nuevoUsuario.save();

        const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Registro exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al registrar el usuario' });
    }
});

module.exports = router;
