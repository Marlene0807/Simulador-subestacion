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
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Por favor ingrese un correo válido']
    },  
    contraseña: {
        type: String,
        required: true, // La contraseña debe estar presente
    }
});

// Creamos y exportamos el modelo de Usuario basado en el esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
