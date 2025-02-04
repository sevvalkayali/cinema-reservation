import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {jwtDecode} from 'jwt-decode';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token');
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: '#1c1c1c',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        borderBottom: '3px solid #FF3B3F',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0.5rem 1rem'
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand text-light"
          to="/"
          style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          {t('app_title') || 'Cinema Reservation'}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: 'none' }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: 'invert(1)' }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                {t('movies')}
              </Link>
            </li>
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/login">
                    {t('login')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/register">
                    {t('register')}
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item dropdown" style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="btn btn-link nav-link text-light"
                  style={{ textDecoration: 'none', fontWeight: 'bold' }}
                >
                  {user.username || user.name}
                </button>
                {showDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      background: '#2c2c2c',
                      padding: '10px',
                      borderRadius: '5px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px'
                    }}
                  >
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="btn btn-sm"
                        style={{
                          background: '#FF3B3F',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '5px'
                        }}
                      >
                        {t('admin_panel') || 'Admin Panel'}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm"
                      style={{
                        background: '#FF3B3F',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '5px'
                      }}
                    >
                      {t('logout') || 'Logout'}
                    </button>
                  </div>
                )}
              </li>
            )}
            {/* Dil Değiştirme */}
            <li className="nav-item ms-3">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
