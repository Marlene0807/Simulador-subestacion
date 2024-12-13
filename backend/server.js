// server.js

// Configuración Express
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/login');
const registerRoutes = require('./routes/registro');

dotenv.config();

const mongoURI = process.env.MONGO_URI;

// Conectar MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error de conexión a MongoDB:', err));

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware para procesar datos JSON y form
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5502', // URL desde donde ejecutas el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', authRoutes);
app.use('/api', registerRoutes);

// Iniciar servidor
app.use(express.json());
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor en puerto ${process.env.PORT || 3000}`);
});