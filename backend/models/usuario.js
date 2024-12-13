// models/usuario.js

const mongoose = require('mongoose');

// Definimos el esquema de un Usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true, // Asegura que el correo sea único
    },
    contraseña: {
        type: String,
        required: true, // La contraseña debe estar presente
    }
});

// Creamos y exportamos el modelo de Usuario basado en el esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
