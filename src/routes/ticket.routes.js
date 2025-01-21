const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new ticket (protected route)
router.post('/', authMiddleware, TicketController.createTicket);

// Get all tickets (admin only)
router.get('/', authMiddleware, TicketController.getAllTickets);

// Get ticket by ID (protected route)
router.get('/:id', authMiddleware, TicketController.getTicketById);

// Update ticket by ID (admin only)
router.put('/:id', authMiddleware, TicketController.updateTicket);

// Delete ticket by ID (admin only)
router.delete('/:id', authMiddleware, TicketController.deleteTicket);

module.exports = router;
