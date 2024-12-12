// Middleware para verificar el token JWT
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Obtener el token del header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
        req.usuario = decoded;  // Guardamos los datos del usuario decodificados
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido o expirado' });
    }
};

module.exports = verificarToken;
