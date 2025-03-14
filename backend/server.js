const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./config/db.config');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parseo de JSON en requests


// Middleware de seguridad
app.use(
  cors({
    origin: "http://localhost:5173", // Permitir el frontend
    credentials: true, // Permitir envío de cookies/tokens en las solicitudes
  })
);
app.use(helmet()); // Configuración de seguridad HTTP
app.use(morgan('dev')); // Logs de peticiones HTTP
app.use(cookieParser());

// Rate Limiting (Máximo 100 requests por IP cada 15 minutos)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP, intenta más tarde.',
});
app.use(limiter);

// Rutas

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tickets', require('./routes/ticket.routes'));


app.get('/', (req, res) => {
  res.send('✅ API en funcionamiento');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
