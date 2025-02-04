const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  reservedSeats: [{ type: Number }],
  reservationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reservation', reservationSchema);
