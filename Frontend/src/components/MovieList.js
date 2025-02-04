import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Örnek içerik: API'den veri alınamazsa dummy veriler gösterilsin
const dummyMovies = [
  {
    _id: 'dummy1',
    title: 'Example Movie 1',
    description: 'This movie offers an epic adventure with exciting action scenes and unforgettable characters.',
    screeningTime: new Date(),
    image: 'https://via.placeholder.com/350x200?text=Film+1'
  },
  {
    _id: 'dummy2',
    title: 'Example Movie 2',
    description: 'This drama film touches the heart with its emotional depth and moving story.',
    screeningTime: new Date(),
    image: 'https://via.placeholder.com/350x200?text=Film+2'
  },
  {
    _id: 'dummy3',
    title: 'Example Movie 3',
    description: 'A science fiction and fantasy masterpiece that will challenge your imagination.',
    screeningTime: new Date(),
    image: 'https://via.placeholder.com/350x200?text=Film+3'
  }
];

function MovieList() {
  const { t } = useTranslation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setMovies(res.data);
        } else {
          setMovies(dummyMovies);
        }
      })
      .catch(err => {
        console.error(err);
        setMovies(dummyMovies);
      });
  }, []);

  return (
    <div>
      {/* Banner Bölümü */}
      <div 
        className="jumbotron p-4 p-md-5 text-white rounded mb-4" 
        style={{ 
          background: 'linear-gradient(135deg,rgb(88, 3, 10), #FF3B3F)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          padding: '50px 0',
          color: '#fff'
        }}
      >
        <div className="col-md-6 px-0">
          <h1 className="display-4" style={{
            fontWeight: 'bold',
            fontSize: '48px',
            textShadow: '3px 3px 12px rgba(0, 0, 0, 0.5)',
            letterSpacing: '2px'
          }}>
            {t('movies')}
          </h1>
          <p className="lead my-3" style={{
            fontSize: '20px',
            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
            fontWeight: 'lighter'
          }}>
            {t('movie_description')}
          </p>
        </div>
      </div>
      
      {/* Modernized Movies Section */}
      <div className="container">
        <h2 className="text-center mb-5" style={{
          fontSize: '40px', fontWeight: 'bold', color: '#FF5F6D', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          {t('movies')}
        </h2>
        <div className="row justify-content-center">
          {movies.map(movie => (
            <div key={movie._id} className="col-md-4 mb-4">
              <div 
                className="card h-100 shadow-lg" 
                style={{
                  backgroundColor: '#333', 
                  borderRadius: '15px', 
                  border: 'none', 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                  transition: 'transform 0.3s ease-in-out'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                <img 
                  src={movie.image || "https://via.placeholder.com/350x200?text=Movie+Image"} 
                  className="card-img-top" 
                  alt={movie.title} 
                  style={{
                    borderRadius: '15px 15px 0 0', 
                    objectFit: 'cover', 
                    height: '200px'
                  }}
                />
                <div className="card-body d-flex flex-column" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '0 0 15px 15px' }}>
                  <h5 className="card-title text-light" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    {movie.title}
                  </h5>
                  <p className="card-text text-muted" style={{ fontSize: '14px', marginBottom: '20px' }}>
                    {movie.description.length > 100 ? movie.description.substring(0, 100) + '...' : movie.description}
                  </p>
                  <p className="card-text">
                    <small className="text-secondary">
                      {new Date(movie.screeningTime).toLocaleString()}
                    </small>
                  </p>
                  <Link 
                    to={`/reservation/${movie._id}`} 
                    className="btn btn-danger mt-auto" 
                    style={{
                      borderRadius: '20px', 
                      padding: '12px 20px', 
                      fontWeight: 'bold', 
                      fontSize: '16px', 
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    {t('reserve')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
