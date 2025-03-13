const express = require('express');
const TicketController = require('../controllers/ticket.controller');
const authMiddleware = require('../middlewares/auth');
const adminAuthMiddleware = require('../middlewares/adminAuth');

const router = express.Router();

/** 
 * 🔹 Rutas para Usuarios Autenticados
 */
router.post('/', authMiddleware, TicketController.create); // Crear un ticket
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
