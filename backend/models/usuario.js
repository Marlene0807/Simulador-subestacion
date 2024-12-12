const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Crear el esquema del usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true, 
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor ingrese un correo electrónico válido'] 
    },
    contraseña: { 
        type: String, 
        required: true, 
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'] 
    }
}, { timestamps: true });  // Para agregar createdAt y updatedAt automáticamente

// Método para comparar la contraseña hasheada
usuarioSchema.methods.compararContraseña = function(contraseña) {
    return bcrypt.compare(contraseña, this.contraseña);
};

// Pre-hook para hashear la contraseña antes de guardarla
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contraseña')) return next();  // Si la contraseña no ha sido modificada, no hace nada

    try {
        const salt = await bcrypt.genSalt(10);  // Genera un salt
        this.contraseña = await bcrypt.hash(this.contraseña, salt);  // Hashea la contraseña
        next();
    } catch (error) {
        next(error);
    }
});

// Crear el modelo de Usuario a partir del esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
