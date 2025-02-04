const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Create a reservation
router.post('/', reservationController.createReservation);

// Get all reservations (admin only)
router.get('/', reservationController.getReservations);

// Delete a reservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
