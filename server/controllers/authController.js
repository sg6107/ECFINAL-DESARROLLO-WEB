const { getConnection } = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { email, password } = req.body;
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ message: 'Error de conexión' });

    const sql = 'SELECT * FROM users WHERE email = ?';
    con.query(sql, [email], (err, results) => {
      con.end();
      if (err) return res.status(500).json({ message: 'Error en la consulta' });
      if (results.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });

      const user = results[0];
      const passwordValid = password === user.password_hash; // solo para pruebas
      if (!passwordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
      res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    });
  });
};


const getProfile = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const con = getConnection();
    con.connect(err => {
      if (err) return res.status(500).json({ message: 'Error de conexión' });

      const sql = 'SELECT id, email, role, created_at FROM users WHERE id = ?';
      con.query(sql, [decoded.id], (err, results) => {
        con.end();
        if (err) return res.status(500).json({ message: 'Error en la consulta' });
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json(results[0]);
      });
    });
    
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = { login, getProfile };
