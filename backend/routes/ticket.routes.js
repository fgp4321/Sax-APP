const express = require('express');
const TicketController = require('../controllers/ticket.controller');
const authMiddleware = require('../middlewares/auth');
const adminAuthMiddleware = require('../middlewares/adminAuth');

const multer = require("multer");
const path = require("path");


// Configuración de multer para almacenar archivos en una carpeta específica
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads")); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname); // Nombre único para evitar colisiones
    },
  });
  
  // Filtrar archivos (opcional)
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
      cb(null, true); // Aceptar imágenes y PDFs
    } else {
      cb(new Error("Formato de archivo no permitido"), false);
    }
  };
  
  // Inicializar multer
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });

const router = express.Router();

/** 
 * 🔹 Rutas para Usuarios Autenticados
 */
router.post("/", authMiddleware, upload.single("adjunto"), TicketController.create); // Crear un ticket
router.get('/:id', authMiddleware, TicketController.getById); // Obtener un ticket por ID
router.get('/', authMiddleware, TicketController.getByUser); // Obtener todos los tickets del usuario autenticado
router.put('/:id', authMiddleware, TicketController.update); // Actualizar un ticket
router.delete('/:id', authMiddleware, TicketController.delete); // Eliminar un ticket
router.put('/:id/restaurar', authMiddleware, TicketController.restore); // Restaurar un ticket eliminado

/** 
 * 🔹 Rutas para Administradores
 */
router.get('/admin/tickets', adminAuthMiddleware, TicketController.getAll); // Obtener todos los tickets

module.exports = router;
