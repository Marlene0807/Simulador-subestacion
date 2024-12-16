// server.js

// Configuración Express
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registro');

// Cargar las variables de entorno
dotenv.config();

const mongoURI = process.env.MONGO_URI; // La cadena de conexión de Cosmos DB

if(!mongoURI) {
  console.error("La variable de entorno MONGODB_URI no esta definida.");
  process.exit(1); // Se detiene
}
// Conectar a la base de datos de Cosmos DB (MongoDB API)
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,  // Aumentar el tiempo de espera (30 segundos)
})
.then(() => {
  console.log("Conexión exitosa a la base de datos CosmosDB");
})
.catch((error) => {
  console.error("Error de conexión a la base de datos con CosmosDB:", error);
});

const app = express();
const port = process.env.PORT || 3000;

//Habilitar CORS para el frontend en el puerto 5502
app.use(cors({
  origin: ['http://127.0.0.1:5502', 'https://simuladorsubestacionelectricatt.azurewebsites.net/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Middleware para procesar datos JSON y form
app.use(express.json());

// Rutas de autenticación y registro
app.use('/api', authRoutes);
app.use('/api', registerRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
