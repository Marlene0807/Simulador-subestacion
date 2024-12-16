// authController.js

// Aqui manejamos el login y registro de usuarios con MongoDB y bcrypt(contraseñas hasheo), JWT(JSON Web Token, autenticacion)
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs'); // Contraseñas
const jwt = require('jsonwebtoken'); // Generar Token

// authController.js - Login
exports.login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario existe
        const usuarioExistente = await Usuario.findOne({ correo });

        // Si no se encuentra el usuario con ese correo
        if (!usuarioExistente) {
            console.log(`Usuario con correo ${correo} no encontrado.`);
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Verificar que la contraseña proporcionada coincida con la almacenada
        const esValida = await bcrypt.compare(contraseña, usuarioExistente.contraseña);
        
        // Si la contraseña es incorrecta
        if (!esValida) {
            console.log('Contraseña incorrecta');
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Si la contraseña es válida, generar el token JWT
        const token = jwt.sign({ id: usuarioExistente._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(`Login exitoso para el usuario ${correo}`);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión' });
    }
};

// authController.js - Registro
exports.registro = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        // Encriptar la contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario({ nombre, correo, contraseña: hashedPassword });
        await nuevoUsuario.save();

        // Generar el token JWT
        const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Registro exitoso', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al registrar el usuario', details: error.message });
    }
};
