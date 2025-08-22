const { getConnection } = require('../db/db');

// Obtener todos los usuarios
const getUsers = (req, res) => {
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    con.query('SELECT id, email, role, created_at FROM users', (err, results) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
};

// Obtener usuario por ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    con.query('SELECT id, email, role, created_at FROM users WHERE id=?', [id], (err, results) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(results[0]);
    });
  });
};

// Crear usuario
const createUser = (req, res) => {
  const { email, password_hash, role } = req.body;
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = 'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)';
    con.query(sql, [email, password_hash, role], (err, result) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Usuario creado', id: result.insertId });
    });
  });
};

// Actualizar usuario
const updateUser = (req, res) => {
  const { id } = req.params;
  const { email, password_hash, role } = req.body;
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = 'UPDATE users SET email=?, password_hash=?, role=? WHERE id=?';
    con.query(sql, [email, password_hash, role, id], (err, result) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuario actualizado', affectedRows: result.affectedRows });
    });
  });
};

// Eliminar usuario
const deleteUser = (req, res) => {
  const { id } = req.params;
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    con.query('DELETE FROM users WHERE id=?', [id], (err, result) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuario eliminado', affectedRows: result.affectedRows });
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
