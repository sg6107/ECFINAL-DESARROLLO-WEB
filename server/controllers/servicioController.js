const { getConnection } = require('../db/db');

const getAllServices = (req, res) => {
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    con.query('SELECT * FROM services', (err, results) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
};

const getServiceById = (req, res) => {
  const { id } = req.params;
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    con.query('SELECT * FROM services WHERE id = ?', [id], (err, results) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: 'Servicio no encontrado' });
      res.json(results[0]);
    });
  });
};

const createService = (req, res) => {
  const { name, description, price, duration_minutes } = req.body;
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = 'INSERT INTO services (name, description, price, duration_minutes) VALUES (?, ?, ?, ?)';
    con.query(sql, [name, description, price, duration_minutes], (err, result) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Servicio creado', id: result.insertId });
    });
  });
};

const updateService = (req, res) => {
  const { id } = req.params;
  const { name, description, price, duration_minutes } = req.body;
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = 'UPDATE services SET name=?, description=?, price=?, duration_minutes=? WHERE id=?';
    con.query(sql, [name, description, price, duration_minutes, id], (err, result) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Servicio actualizado', affectedRows: result.affectedRows });
    });
  });
};

const deleteService = (req, res) => {
  const { id } = req.params;
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    con.query('DELETE FROM services WHERE id=?', [id], (err, result) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Servicio eliminado', affectedRows: result.affectedRows });
    });
  });
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
