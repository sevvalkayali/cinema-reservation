import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#1c1c1c',
        borderTop: '2px solid #FF3B3F',
        color: '#ccc',
        padding: '20px 0'
      }}
    >
      <div className="container text-center">
        <p style={{ margin: 0 }}>
          © 2025 Cinema Reservation. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
