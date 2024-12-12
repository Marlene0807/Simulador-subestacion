// userController.js

// Lógica del CRUD
const Usuario = require('../models/usuario');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener usuarios' });
    }
};

// Obtener un usuario específico por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener el usuario' });
    }
};

// Actualizar la información del usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const { nombre, correo } = req.body;

        const usuario = await Usuario.findById(req.params.id);

        if (usuario) {
            if (nombre) usuario.nombre = nombre;
            if (correo) usuario.correo = correo;

            const usuarioActualizado = await usuario.save();

            res.status(200).json(usuarioActualizado);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al actualizar el usuario' });
    }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);

        if (usuario) {
            await usuario.remove();
            res.status(200).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al eliminar el usuario' });
    }
};
