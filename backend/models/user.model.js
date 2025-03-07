const db = require('../config/db.config');
const bcrypt = require('bcryptjs');

const User = {
  /** 
   * 🔹 Crear un nuevo usuario 
   * (Administrador puede asignar rol)
   */
  create: async (dni, nombre, apellidos, email, telefono, password, rol = 'ciudadano') => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const sql = `
        INSERT INTO usuarios (dni, nombre, apellidos, email, telefono, password_hash, rol) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      return new Promise((resolve, reject) => {
        db.query(sql, [dni.toUpperCase(), nombre, apellidos, email, telefono, hashedPassword, rol], (err, result) => {
          if (err) reject(err);
          else resolve(result.insertId);
        });
      });
    } catch (error) {
      throw error;
    }
  },

  /** 
   * 🔹 Buscar usuario por Email
   */
  findByEmail: async (email) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND deleted_at IS NULL LIMIT 1';
    return new Promise((resolve, reject) => {
      db.query(sql, [email], (err, result) => {
        if (err) reject(err);
        else resolve(result[0] || null);
      });
    });
  },

  /** 
   * 🔹 Buscar usuario por DNI
   */
  findByDNI: async (dni) => {
    const sql = 'SELECT * FROM usuarios WHERE dni = ? AND deleted_at IS NULL LIMIT 1';
    return new Promise((resolve, reject) => {
      db.query(sql, [dni], (err, result) => {
        if (err) reject(err);
        else resolve(result[0] || null);
      });
    });
  },

  /** 
   * 🔹 Buscar usuario por ID
   */
  findById: async (id) => {
    const sql = `
      SELECT id, dni, nombre, apellidos, email, telefono, rol, created_at, deleted_at 
      FROM usuarios WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0] || null);
      });
    });
  },

  /** 
   * 🔹 Buscar usuario por identificador único (DNI o Email)
   */
  findByIdentifier: async (identifier) => {
    const sql = 'SELECT * FROM usuarios WHERE (email = ? OR dni = ?) AND deleted_at IS NULL LIMIT 1';
    return new Promise((resolve, reject) => {
      db.query(sql, [identifier, identifier.toUpperCase()], (err, result) => {
        if (err) reject(err);
        else resolve(result[0] || null);
      });
    });
  },

  /** 
   * 🔹 Obtener todos los usuarios con filtros, búsqueda y ordenación 
   * (Solo Administradores)
   */
  getAllUsers: async (estado = 'todos', search = '', sortBy = 'created_at', order = 'DESC') => {
    let sql = `
      SELECT id, dni, nombre, apellidos, email, telefono, rol, created_at, deleted_at 
      FROM usuarios
    `;

    let conditions = [];
    let values = [];

    if (estado === 'activos') conditions.push('deleted_at IS NULL');
    else if (estado === 'desactivados') conditions.push('deleted_at IS NOT NULL');

    if (search) {
      conditions.push('(dni LIKE ? OR nombre LIKE ? OR apellidos LIKE ? OR email LIKE ?)');
      values.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) sql += ' WHERE ' + conditions.join(' AND ');

    sql += ` ORDER BY ${sortBy} ${order}`;

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },


  /** 
   * 🔹 Actualizar datos del usuario (Incluye cambio de rol)
   */
  update: async (id, nombre, apellidos, email, telefono, rol) => {
    const sql = `
      UPDATE usuarios 
      SET nombre = ?, apellidos = ?, email = ?, telefono = ?, rol = ?, updated_at = NOW() 
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [nombre, apellidos, email, telefono, rol, id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  },

  /** 
   * 🔹 Cambiar contraseña
   */
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

  /** 
   * 🔹 Desactivar y Reactivar Usuarios (Soft Delete)
   */
  deactivate: async (id) => {
    const sql = 'UPDATE usuarios SET deleted_at = NOW() WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  },

  reactivate: async (id) => {
    const sql = 'UPDATE usuarios SET deleted_at = NULL WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  }
};

module.exports = User;
