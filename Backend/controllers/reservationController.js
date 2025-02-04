// backend/controllers/reservationController.js
const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  try {
    const { movieId, reservedSeats } = req.body;
    const reservation = await Reservation.create({
      userId: req.user.id,
      movieId,
      reservedSeats
    });
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    // Eğer kullanıcı admin değilse yalnızca kendi rezervasyonlarını getirsin.
    const query = req.user.role !== 'admin' ? { userId: req.user.id } : {};
    const reservations = await Reservation.findAll({ where: query });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
