const mssql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = process.env;  // .env dosyasından JWT secret alıyoruz

// Admin kayıt işlemi
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await mssql.query`
      INSERT INTO Users (username, password, role)
      VALUES (${username}, ${hashedPassword}, ${role || 'user'})
    `;

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Admin ve kullanıcı girişi
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await mssql.query`
      SELECT * FROM Users WHERE username = ${username}
    `;
    
    const user = result.recordset[0];
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error during login' });
  }
};
