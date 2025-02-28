const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET

const UserController = {
// Registro de usuario
register: async (req, res) => {
  try {
    const { nombre, apellidos, email, telefono, password } = req.body;

    // Verificar si el email ya está en uso
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }

    // Forzar el rol "ciudadano"
    const userId = await User.create(nombre, apellidos, email, telefono, password, 'ciudadano');
    
    // Obtener usuario recién creado
    const newUser = await User.findById(userId);

    // Crear token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, rol: newUser.rol },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    // Guardar token en cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: 'Usuario registrado y autenticado exitosamente.',
      token,
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        apellidos: newUser.apellidos,
        email: newUser.email,
        telefono: newUser.telefono,
        rol: newUser.rol
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
},



// Login de usuario
login: async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    // Guardar token en cookie segura
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2 * 60 * 60 * 1000, // 2 horas
    });

    // Enviar todos los datos del usuario
    res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        telefono: user.telefono,
        rol: user.rol
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
},


  // Logout de usuario
  logout: (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Sesión cerrada correctamente' });
  },

  // Obtener perfil de usuario
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Actualizar datos del usuario
  updateProfile: async (req, res) => {
    try {
      const { nombre, apellidos, email, telefono } = req.body;
      const result = await User.update(req.user.id, nombre, apellidos, email, telefono);
      if (!result) return res.status(400).json({ message: 'No se pudo actualizar' });
      res.json({ message: 'Perfil actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Cambiar contraseña
  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id);

      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      // Verificar contraseña actual
      const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
      if (!isMatch) return res.status(400).json({ message: 'Contraseña actual incorrecta' });

      // Actualizar contraseña
      await User.changePassword(req.user.id, newPassword);
      res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Borrar usuario (borrado lógico)
  deleteUser: async (req, res) => {
    try {
      const result = await User.delete(req.user.id);
      if (!result) return res.status(400).json({ message: 'No se pudo eliminar' });
      res.json({ message: 'Cuenta eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  }
};

module.exports = UserController;
