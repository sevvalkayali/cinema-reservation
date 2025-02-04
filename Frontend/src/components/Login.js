import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate hook'u
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook'u

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/'); // Giriş başarılı ise ana sayfaya yönlendirme
    } catch (err) {
      alert(t('login_failed'));
    }
  };

  // Admin login butonuna tıklandığında yönlendirme yapılacak
  const handleAdminLogin = () => {
    navigate('/admin-login'); // Admin login sayfasına yönlendir
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #000000, #2c2c2c)',
        position: 'relative',
      }}
    >
      {/* Hafif overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      ></div>

      <div
        className="card shadow"
        style={{
          width: '100%',
          maxWidth: '400px',
          zIndex: 1,
          border: 'none',
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="card-header text-center" style={{ backgroundColor: 'transparent', borderBottom: 'none' }}>
          <h3 className="text-light" style={{ fontWeight: 'bold' }}>
            {t('login')}
          </h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-light">
                {t('username')}
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px',
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">
                {t('password')}
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px',
                }}
              />
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{
                background: 'linear-gradient(45deg, #8B0000, #A40000)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                border: 'none',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '30px',
                padding: '10px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              {t('login')}
            </button>
          </form>
          <div className="mt-3 text-center">
            <button
              onClick={handleAdminLogin}
              className="btn w-100"
              style={{
                background: 'linear-gradient(45deg, #8B0000, #A40000)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                border: 'none',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '30px',
                padding: '8px 12px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              {t('admin_login') || 'Admin Login'}
            </button>
          </div>
        </div>
        <div className="card-footer text-center" style={{ backgroundColor: 'transparent' }}>
          <small className="text-light">{t('welcome_to_cinema') || 'Experience the magic of cinema'}</small>
        </div>
      </div>
    </div>
  );
};

export default Login;
