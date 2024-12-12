// authController.js

// Aqui manejamos el login y registro de usuarios con MongoDB y bcrypt(contraseñas hasheo), JWT(JSON Web Token, autenticacion)
const Usuario = require('./backend/models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        if (!nombre || !correo || !contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

exports.registro = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const nuevoUsuario = new Usuario({ nombre, correo, contraseña: hashedPassword });
        await nuevoUsuario.save();

        const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Registro exitoso', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al registrar el usuario' });
    }
};
