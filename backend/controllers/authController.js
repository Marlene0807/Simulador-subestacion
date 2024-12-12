const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }

        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValida) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al iniciar sesión' });
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
