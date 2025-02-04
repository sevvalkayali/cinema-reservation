import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function AdminDashboard() {
  const { t } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [screeningTime, setScreeningTime] = useState('');
  const [seats, setSeats] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/movies',
        { title, description, screeningTime, seats },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      alert(t('movie_added'));
      window.location.reload();
    } catch (err) {
      alert(t('movie_add_failed'));
    }
  };

  return (
    <div className="container" style={{ maxWidth: '900px', marginTop: '20px' }}>
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#FF5F6D' }}>{t('admin_dashboard')}</h2>
      
      {/* Add Movie Form */}
      <h3 className="text-light mb-3">{t('add_movie')}</h3>
      <form onSubmit={handleAddMovie}>
        <div className="form-group mb-3">
          <label htmlFor="title" className="text-light">{t('title')}</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#fff',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description" className="text-light">{t('description')}</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#fff',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="screeningTime" className="text-light">{t('screening_time')}</label>
          <input
            type="datetime-local"
            className="form-control"
            id="screeningTime"
            value={screeningTime}
            onChange={(e) => setScreeningTime(e.target.value)}
            required
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#fff',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="seats" className="text-light">{t('seats')}</label>
          <input
            type="number"
            className="form-control"
            id="seats"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            required
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#fff',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
        <button
          type="submit"
          className="btn w-100"
          style={{
            background: 'linear-gradient(45deg, #FF5F6D, #FF3B3F)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            border: 'none',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '30px',
            padding: '10px',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          {t('add_movie')}
        </button>
      </form>
      <hr />
      
      {/* Current Movies List */}
      <h3 className="text-light mb-3">{t('current_movies')}</h3>
      <ul className="list-group">
        {movies.map((movie) => (
          <li
            key={movie._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              border: 'none',
              marginBottom: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <span>{movie.title}</span>
            <button
              className="btn btn-sm btn-danger"
              style={{ borderRadius: '15px' }}
              onClick={() => alert('Delete movie functionality here')}
            >
              {t('delete')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
