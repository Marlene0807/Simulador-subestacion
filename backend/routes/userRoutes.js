// userRoutes.js

// Definimos las rutas para el CRUD
const express = require('express');

const mongoose = require('mongoose');
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'ID de usuario no válido' });
}

const {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/userController');

const router = express.Router();

// Rutas CRUD de usuarios
router.get('/:id', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
