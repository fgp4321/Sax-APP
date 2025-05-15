const db = require('../config/db.config');

const Reserva = {
  /**
   * 🔹 Crear una nueva reserva
   */
  create: async (usuario_id, nombre, apellidos, telefono, email, fecha, horario, num_personas) => {
    const sql = `
      INSERT INTO reservas_castillo (usuario_id, nombre, apellidos, telefono, email, fecha, horario, num_personas)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [usuario_id, nombre, apellidos, telefono, email, fecha, horario, num_personas], (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      });
    });
  },

  /**
   * 🔹 Obtener todas las reservas de un usuario
   */
  findByUser: async (usuario_id) => {
    const sql = `
      SELECT r.*, u.nombre AS usuario_nombre, u.email AS usuario_email
      FROM reservas_castillo r
      LEFT JOIN usuarios u ON r.usuario_id = u.id
      WHERE r.usuario_id = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [usuario_id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  /**
   * 🔹 Obtener una reserva por ID
   */
  findById: async (id) => {
    const sql = `
      SELECT r.*, u.nombre AS usuario_nombre, u.email AS usuario_email
      FROM reservas_castillo r
      LEFT JOIN usuarios u ON r.usuario_id = u.id
      WHERE r.id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0] || null);
      });
    });
  },

  /**
   * 🔹 Obtener todas las reservas (admin)
   */
  getAll: async (fecha = null, search = '', sortBy = 'fecha', order = 'ASC') => {
    let sql = `
      SELECT r.*, u.nombre AS usuario_nombre, u.email AS usuario_email
      FROM reservas_castillo r
      LEFT JOIN usuarios u ON r.usuario_id = u.id
      WHERE 1 = 1
    `;

    const values = [];

    if (fecha) {
      sql += ' AND r.fecha = ?';
      values.push(fecha);
    }

    if (search) {
      sql += ` AND (r.nombre LIKE ? OR r.apellidos LIKE ? OR r.email LIKE ?)`;
      values.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ` ORDER BY r.${sortBy} ${order}`;

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  /**
   * 🔹 Eliminar una reserva
   */
  delete: async (id) => {
    const sql = 'DELETE FROM reservas_castillo WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows);
      });
    });
  }
};

module.exports = Reserva;
