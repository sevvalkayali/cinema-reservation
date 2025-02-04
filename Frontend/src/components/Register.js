import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t('passwords_do_not_match') || "Passwords do not match!");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', { fullName, email, username, password });
      alert(t('registration_success'));
      navigate('/login');
    } catch (err) {
      alert(t('registration_failed'));
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ 
        background: "linear-gradient(135deg, #000000, #2c2c2c)",
        position: "relative"
      }}
    >
      {/* Hafif overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
      ></div>
      
      <div 
        className="card shadow" 
        style={{
          width: '100%',
          maxWidth: '450px',
          zIndex: 1,
          border: 'none',
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div 
          className="card-header text-center" 
          style={{
            backgroundColor: 'transparent',
            borderBottom: 'none'
          }}
        >
          <h3 className="text-light" style={{ fontWeight: 'bold' }}>
            {t('register')}
          </h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Tam Ad */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label text-light">
                {t('full_name') || "Full Name"}
              </label>
              <input 
                type="text" 
                id="fullName" 
                className="form-control" 
                placeholder="John Doe" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                required 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px'
                }}
              />
            </div>
            {/* E-posta */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">
                {t('email') || "Email"}
              </label>
              <input 
                type="email" 
                id="email" 
                className="form-control" 
                placeholder="example@mail.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px'
                }}
              />
            </div>
            {/* Kullanıcı Adı */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-light">
                {t('username')}
              </label>
              <input 
                type="text" 
                id="username" 
                className="form-control" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px'
                }}
              />
            </div>
            {/* Şifre */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">
                {t('password')}
              </label>
              <input 
                type="password" 
                id="password" 
                className="form-control" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px'
                }}
              />
            </div>
            {/* Şifre Teyidi */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label text-light">
                {t('confirm_password') || "Confirm Password"}
              </label>
              <input 
                type="password" 
                id="confirmPassword" 
                className="form-control" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px'
                }}
              />
            </div>
            <button 
              type="submit" 
              className="btn w-100"
              style={{
                background: "linear-gradient(45deg, #8B0000, #A40000)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                border: 'none',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '30px',
                padding: '10px',
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
            >
              {t('register')}
            </button>
          </form>
        </div>
        <div className="card-footer text-center" style={{
          backgroundColor: 'transparent'
        }}>
          <small className="text-light">
            {t('join_cinema') || 'Join the cinema experience'}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
