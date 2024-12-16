// Backend - login.js (ruta para manejar inicio de sesión)
const express = require('express');
const Usuario = require('../models/usuario');
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
        // Buscar usuario en la base de datos
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }
        // Comparar la contraseña con bcrypt
        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValida) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }
        // Generar el token JWT
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        //Enviar el token en la respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesion:', error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión' });
    }
});
module.exports = router;
