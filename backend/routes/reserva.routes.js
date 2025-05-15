const express = require('express');
const ReservaController = require('../controllers/reserva.controller');
const authMiddleware = require('../middlewares/auth');
const adminAuthMiddleware = require('../middlewares/adminAuth');

const router = express.Router();

/**
 * 🔹 Rutas Públicas (NO requieren estar autenticado)
 */
router.post('/', ReservaController.create); // Crear una nueva reserva (usuario opcional)
router.get('/:id', ReservaController.getById); // Obtener una reserva por ID

/**
 * 🔹 Rutas para Usuarios Autenticados (Opcional: si luego quieres permitir login para ver sus reservas)
 */
router.get('/', authMiddleware, ReservaController.getByUser);

/**
 * 🔹 Rutas para Administradores
 */
router.get('/admin/reservas', adminAuthMiddleware, ReservaController.getAll); // Obtener todas las reservas
router.delete('/:id', adminAuthMiddleware, ReservaController.delete); // Eliminar una reserva

module.exports = router;
