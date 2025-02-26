const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');
const adminAuthMiddleware = require('../middlewares/adminAuth');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', authMiddleware, UserController.logout);

router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateProfile);
router.put('/change-password', authMiddleware, UserController.changePassword);
router.delete('/delete', adminAuthMiddleware, UserController.deleteUser);

module.exports = router;
