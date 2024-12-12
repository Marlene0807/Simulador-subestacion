// usuario.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true, 
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor ingrese un correo válido'] 
    },
    contraseña: { 
        type: String, 
        required: true, 
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'] 
    }
}, { timestamps: true });

usuarioSchema.methods.compararContraseña = function(contraseña) {
    return bcrypt.compare(contraseña, this.contraseña);
};

usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contraseña')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.contraseña = await bcrypt.hash(this.contraseña, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
