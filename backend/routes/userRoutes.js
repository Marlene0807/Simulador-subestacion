// userRoutes.js

// Definimos las rutas para el CRUD
const express = require('express');
const {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/userController');

const router = express.Router();

// Rutas CRUD de usuarios
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
