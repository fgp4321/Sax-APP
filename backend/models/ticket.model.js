const db = require('../config/db.config');

const Ticket = {
  /**
   * 🔹 Crear un nuevo ticket
   */
  create: async (usuario_id, categoria, subcategoria, descripcion, ubicacion = null, adjunto = null) => {
    const sql = `
      INSERT INTO tickets (usuario_id, categoria, subcategoria, descripcion, ubicacion, adjunto)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [usuario_id, categoria, subcategoria, descripcion, ubicacion, adjunto], (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      });
    });
  },

  /**
   * 🔹 Obtener todos los tickets de un usuario
   */
  findByUser: async (usuario_id) => {
    const sql = `
      SELECT t.*, u.nombre AS usuario_nombre, u.email AS usuario_email
      FROM tickets t
      JOIN usuarios u ON t.usuario_id = u.id
      WHERE t.usuario_id = ? AND t.deleted_at IS NULL
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [usuario_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  /**
   * 🔹 Obtener un ticket por su ID
   */
  findById: async (id) => {
    const sql = `
      SELECT t.*, u.nombre AS usuario_nombre, u.email AS usuario_email
      FROM tickets t
      JOIN usuarios u ON t.usuario_id = u.id
      WHERE t.id = ? AND t.deleted_at IS NULL
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0] || null);
      });
    });
  },

  /**
   * 🔹 Obtener todos los tickets con filtros opcionales
   */
  getAll: async (categoria = null, usuario_id = null, search = '', sortBy = 'fecha_creacion', order = 'DESC') => {
    let sql = `
      SELECT t.*, u.nombre AS usuario_nombre, u.email AS usuario_email
      FROM tickets t
      JOIN usuarios u ON t.usuario_id = u.id
      WHERE t.deleted_at IS NULL
    `;

    let conditions = [];
    let values = [];

    if (categoria) {
      conditions.push('t.categoria = ?');
      values.push(categoria);
    }

    if (usuario_id) {
      conditions.push('t.usuario_id = ?');
      values.push(usuario_id);
    }

    if (search) {
      conditions.push('(t.descripcion LIKE ? OR u.nombre LIKE ? OR u.email LIKE ?)');
      values.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) sql += ' AND ' + conditions.join(' AND ');

    sql += ` ORDER BY t.${sortBy} ${order}`;

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  /**
   * 🔹 Actualizar ticket
   */
  update: async (id, categoria, subcategoria, descripcion, ubicacion = null, adjunto = null) => {
    const sql = `
      UPDATE tickets 
      SET categoria = ?, subcategoria = ?, descripcion = ?, ubicacion = ?, adjunto = ?, updated_at = NOW()
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [categoria, subcategoria, descripcion, ubicacion, adjunto, id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  },

  /**
   * 🔹 Eliminar un ticket (Soft Delete)
   */
  delete: async (id) => {
    const sql = 'UPDATE tickets SET deleted_at = NOW() WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  },

  /**
   * 🔹 Restaurar un ticket eliminado
   */
  restore: async (id) => {
    const sql = 'UPDATE tickets SET deleted_at = NULL WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  }
};

module.exports = Ticket;
