const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Asegúrate de incluir esto

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'frontend'))); // Esto sirve todo desde la carpeta frontend

// Configuración de CORS, body-parser y las rutas

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
