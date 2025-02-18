const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'FormularioQuejasSugerencias',
  connectionLimit: 10, // Manejo de múltiples conexiones
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
    process.exit(1); // Detiene la ejecución en caso de error
  }
  console.log('✅ Conectado a la base de datos');
  connection.release(); // Liberar conexión
});

module.exports = db;
