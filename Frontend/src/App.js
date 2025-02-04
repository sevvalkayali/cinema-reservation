import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MovieList from './components/MovieList';
import Login from './components/Login';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';  // Admin login sayfası import edildi
import AdminDashboard from './components/AdminDashboard';  // Admin dashboard sayfası import edildi
import Reservation from './components/Reservation';

function App() {
  return (
    <div
      style={{
        background: '#1c1c1c',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />  {/* Admin login sayfası */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Admin dashboard sayfası */}
          <Route path="/reservation/:movieId" element={<Reservation />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
