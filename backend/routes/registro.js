// Backend - registro.js (ruta para manejar el registro)
const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ error: 'Por favor, complete todos los campos' });
    }

    try {
        // Verificar si el usuario ya existe
        const existeUsuario = await Usuario.findOne({ correo });
        if (existeUsuario) {
            return res.status(400).json({ error: 'El correo ya está en uso' });
        }

        // Cifrar la contraseña con bcrypt
        const contraseñaCifrada = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            contraseña: contraseñaCifrada,
        });

        if (nuevoUsuario) {
            res.status(201).json({
                message: '¡Usuario registrado con éxito!',
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al registrar el usuario' });
    }
});

module.exports = router;
