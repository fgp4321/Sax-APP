const Ticket = require('../models/ticket.model');

const TicketController = {
  // Crear un nuevo ticket
  create: async (req, res) => {
    try {
      const { categoria, subcategoria, descripcion, ubicacion, adjunto } = req.body;
      const usuario_id = req.user.id; // Se obtiene del token JWT

      const ticketId = await Ticket.create(usuario_id, categoria, subcategoria, descripcion, ubicacion, adjunto);
      const newTicket = await Ticket.findById(ticketId);

      res.status(201).json({
        message: 'Ticket creado exitosamente.',
        ticket: newTicket,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Obtener un ticket por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findById(id);

      if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });

      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Obtener todos los tickets del usuario autenticado
  getByUser: async (req, res) => {
    try {
      const usuario_id = req.user.id;
      const tickets = await Ticket.findByUser(usuario_id);

      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Obtener todos los tickets (Solo para administradores)
  getAll: async (req, res) => {
    try {
      const { search, categoria, subcategoria, sortBy, order } = req.query;
      const tickets = await Ticket.getAll(search, categoria, subcategoria, sortBy, order);

      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Actualizar un ticket
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { categoria, subcategoria, descripcion, ubicacion, adjunto } = req.body;

      const result = await Ticket.update(id, categoria, subcategoria, descripcion, ubicacion, adjunto);
      if (!result) return res.status(400).json({ message: 'No se pudo actualizar el ticket' });

      res.json({ message: 'Ticket actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Eliminar un ticket (borrado lógico)
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Ticket.delete(id);

      if (!result) return res.status(400).json({ message: 'No se pudo eliminar el ticket' });

      res.json({ message: 'Ticket eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Restaurar un ticket eliminado
  restore: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Ticket.restore(id);

      if (!result) return res.status(400).json({ message: 'No se pudo restaurar el ticket' });

      res.json({ message: 'Ticket restaurado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  }
};

module.exports = TicketController;
