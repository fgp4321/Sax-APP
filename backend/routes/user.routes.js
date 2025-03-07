const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');
const adminAuthMiddleware = require('../middlewares/adminAuth');

const router = express.Router();

/** 
 * 🔹 Rutas Públicas (Sin Autenticación)
 */
router.post('/register', UserController.register);
router.post('/login', UserController.login);

/** 
 * 🔹 Rutas para Usuarios Autenticados
 */
router.post('/logout', authMiddleware, UserController.logout);
router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateProfile);
router.put('/change-password', authMiddleware, UserController.changePassword);

/** 
 * 🔹 Rutas para Administradores
 */
router.get('/usuarios', adminAuthMiddleware, UserController.getAllUsers);
router.put('/usuarios/:id', adminAuthMiddleware, UserController.updateUser); // Editar usuario (incluye cambio de rol)
router.put('/usuarios/:id/desactivar', adminAuthMiddleware, UserController.deactivateUser);
router.put('/usuarios/:id/reactivar', adminAuthMiddleware, UserController.reactivateUser);

module.exports = router;
