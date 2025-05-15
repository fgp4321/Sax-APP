const Reserva = require('../models/reserva.model');

const ReservaController = {
  // Crear una nueva reserva
  create: async (req, res) => {
    try {
      console.log("📌 [DEBUG] req.body recibido:", req.body);

      const { nombre, apellidos, telefono, email, fecha, horario, num_personas } = req.body;
      const usuario_id = req.user ? req.user.id : null; // Si el usuario no está logueado será null

      const reservaId = await Reserva.create(usuario_id, nombre, apellidos, telefono, email, fecha, horario, num_personas);
      const newReserva = await Reserva.findById(reservaId);

      res.status(201).json({
        message: "Reserva creada exitosamente.",
        reserva: newReserva,
      });
    } catch (error) {
      console.error("🚨 [ERROR] Error en la operación create:", error);
      res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  },

  // Obtener una reserva por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findById(id);

      if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });

      res.json(reserva);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Obtener todas las reservas del usuario autenticado
  getByUser: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
      }

      const usuario_id = req.user.id;
      const reservas = await Reserva.findByUser(usuario_id);

      if (!reservas.length) {
        return res.status(404).json({ message: 'No se encontraron reservas para este usuario' });
      }

      res.json(reservas);
    } catch (error) {
      console.error("🔥 Error al obtener las reservas:", error);
      res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  },

  // Obtener todas las reservas (admin)
  getAll: async (req, res) => {
    try {
      const { fecha, search, sortBy, order } = req.query;
      const reservas = await Reserva.getAll(fecha, search, sortBy, order);

      res.json(reservas);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Eliminar una reserva
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Reserva.delete(id);

      if (!result) return res.status(400).json({ message: 'No se pudo eliminar la reserva' });

      res.json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  }
};

module.exports = ReservaController;
