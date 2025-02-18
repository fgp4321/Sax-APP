const db = require('../config/db.config');
const bcrypt = require('bcryptjs');

const User = {
  // Crear un nuevo usuario (Registro)
  create: async (nombre, apellidos, email, telefono, password, rol = 'ciudadano') => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const sql = 'INSERT INTO usuarios (nombre, apellidos, email, telefono, password_hash, rol) VALUES (?, ?, ?, ?, ?, ?)';
      return new Promise((resolve, reject) => {
        db.query(sql, [nombre, apellidos, email, telefono, hashedPassword, rol], (err, result) => {
          if (err) reject(err);
          else resolve(result.insertId);
        });
      });
    } catch (error) {
      throw error;
    }
  },

  // Buscar usuario por email
  findByEmail: async (email) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';
    return new Promise((resolve, reject) => {
      db.query(sql, [email], (err, result) => {
        if (err) reject(err);
        else resolve(result[0] || null);
      });
    });
  },

  // Obtener usuario por ID
  findById: async (id) => {
    const sql = 'SELECT id, nombre, apellidos, email, telefono, rol, created_at FROM usuarios WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0] || null);
      });
    });
  },

  // Actualizar datos del usuario
  update: async (id, nombre, apellidos, email, telefono) => {
    const sql = 'UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, telefono = ?, updated_at = NOW() WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [nombre, apellidos, email, telefono, id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  },

  // Cambiar contraseña
  changePassword: async (id, newPassword) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const sql = 'UPDATE usuarios SET password_hash = ?, updated_at = NOW() WHERE id = ?';
      return new Promise((resolve, reject) => {
        db.query(sql, [hashedPassword, id], (err, result) => {
          if (err) reject(err);
          else resolve(result.affectedRows);
        });
      });
    } catch (error) {
      throw error;
    }
  },

  // Eliminar usuario (borrado lógico)
  delete: async (id) => {
    const sql = 'UPDATE usuarios SET deleted_at = NOW() WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  }
};

module.exports = User;
