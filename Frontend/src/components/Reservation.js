import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Reservation() {
  const { t } = useTranslation();
  const { movieId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [screeningTimes, setScreeningTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  // Filmle ilgili seans saatlerini almak
  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${movieId}/screening-times`)
      .then(res => {
        setScreeningTimes(res.data);
        setSelectedTime(res.data[0]?.time || '');  // Varsayılan olarak ilk saati seç
      })
      .catch(err => console.error(err));
  }, [movieId]);

  // Koltuk seçimini güncelle
  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Rezervasyonu gönder
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/reservations', 
        { movieId, reservedSeats: selectedSeats, screeningTime: selectedTime },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      alert(t('reservation_success'));
    } catch (err) {
      alert(t('reservation_failed'));
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4" style={{ color: '#FF5F6D' }}>{t('reservation')}</h2>

      {/* Seans saatini seç */}
      <div className="form-group mb-4">
        <label>{t('select_screening_time')}</label>
        <select 
          className="form-control" 
          value={selectedTime} 
          onChange={(e) => setSelectedTime(e.target.value)}
          style={{ backgroundColor: '#333', color: '#fff' }}
        >
          {screeningTimes.map((time, index) => (
            <option key={index} value={time.time}>
              {time.time}
            </option>
          ))}
        </select>
      </div>

      {/* Koltuk seçimi */}
      <h4>{t('select_seats')}</h4>
      <div className="seat-grid">
        {Array.from({ length: 25 }, (_, index) => {
          const seatNumber = index + 1;
          const isSelected = selectedSeats.includes(seatNumber);
          return (
            <button
              key={seatNumber}
              className={`seat ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seatNumber)}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>

      {/* Formu gönder */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>{t('reserved_seats')}</label>
          <input 
            type="text" 
            className="form-control" 
            value={selectedSeats.join(', ')} 
            readOnly 
            style={{ backgroundColor: '#333', color: '#fff' }}
          />
        </div>
        <button type="submit" className="btn btn-danger w-100 mt-3" style={{ background: 'linear-gradient(45deg, #FF5F6D, #FF3B3F)' }}>
          {t('reserve')}
        </button>
      </form>
    </div>
  );
}

export default Reservation;
