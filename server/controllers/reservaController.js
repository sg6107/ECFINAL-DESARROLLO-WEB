const { getConnection } = require('../db/db'); 
const jwt = require('jsonwebtoken'); 

const getAllReservations = (req, res) => { 
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) return res.status(401).json({ error: 'Token requerido' }); 

  let decoded; 
  try { 
    decoded = jwt.verify(token, process.env.JWT_SECRET); 
  } catch (err) { 
    return res.status(401).json({ error: 'Token inválido' }); 
  } 

  const con = getConnection(); 
  con.connect(err => { 
    if (err) return res.status(500).json({ error: err.message }); 

    const sql = 'SELECT * FROM reservations WHERE customer_email = ?'; 
    con.query(sql, [decoded.email], (err, results) => { 
      con.end(); 
      if (err) return res.status(500).json({ error: err.message }); 
      res.json(results); 
    }); 
  }); 
}; 

const getReservationById = (req, res) => { 
  const { id } = req.params; 
  const con = getConnection(); 
  con.connect(err => { 
    if (err) return res.status(500).json({ error: err.message }); 

    con.query('SELECT * FROM reservations WHERE id = ?', [id], (err, results) => { 
      con.end(); 
      if (err) return res.status(500).json({ error: err.message }); 
      if (results.length === 0) return res.status(404).json({ error: 'Reserva no encontrada' }); 
      res.json(results[0]); 
    }); 
  }); 
}; 

const createReservation = (req, res) => { 
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) return res.status(401).json({ error: 'Token requerido' }); 

  let decoded; 
  try { 
    decoded = jwt.verify(token, process.env.JWT_SECRET); 
  } catch (err) { 
    return res.status(401).json({ error: 'Token inválido' }); 
  } 

  const { service_id, customer_name, date, time, status } = req.body; 
  const customer_email = decoded.email || decoded.usuario || ''; // <-- revisa tu token
  if (!customer_email) return res.status(400).json({ error: 'Email del usuario no encontrado en token' });

  const con = getConnection(); 
  con.connect(err => { 
    if (err) {
      console.error('Error de conexión a DB:', err);
      return res.status(500).json({ error: err.message });
    }

    const sql = 'INSERT INTO reservations (service_id, customer_name, customer_email, date, time, status) VALUES (?, ?, ?, ?, ?, ?)'; 
    console.log('SQL Data:', { service_id, customer_name, customer_email, date, time, status });

    con.query(sql, [service_id, customer_name, customer_email, date, time, status], (err, result) => {
      con.end();
      if (err) {
        console.error('Error SQL al crear reserva:', err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ 
        id: result.insertId,
        service_id,
        customer_name,
        customer_email,
        date,
        time,
        status
      });
    });
  }); 
};


const updateReservation = (req, res) => { 
  const { id } = req.params; 
  const { service_id, customer_name, customer_email, date, time, status } = req.body; 
  const con = getConnection(); 
  con.connect(err => { 
    if (err) return res.status(500).json({ error: err.message }); 

    const sql = 'UPDATE reservations SET service_id=?, customer_name=?, customer_email=?, date=?, time=?, status=? WHERE id=?'; 
    con.query(sql, [service_id, customer_name, customer_email, date, time, status, id], (err, result) => { 
      con.end(); 
      if (err) return res.status(500).json({ error: err.message }); 
      res.json({ message: 'Reserva actualizada', affectedRows: result.affectedRows }); 
    }); 
  }); 
}; 

const deleteReservation = (req, res) => { 
  const { id } = req.params; 
  const con = getConnection(); 
  con.connect(err => { 
    if (err) return res.status(500).json({ error: err.message }); 

    con.query('DELETE FROM reservations WHERE id=?', [id], (err, result) => { 
      con.end(); 
      if (err) return res.status(500).json({ error: err.message }); 
      res.json({ message: 'Reserva eliminada', affectedRows: result.affectedRows }); 
    }); 
  }); 
}; 

const updateReservationStatus = (req, res) => { 
  const { id } = req.params; 
  const { status } = req.body; 

  if (!status) return res.status(400).json({ error: 'Status requerido' }); 

  const con = getConnection(); 
  con.connect(err => { 
    if (err) return res.status(500).json({ error: err.message }); 

    const sql = 'UPDATE reservations SET status=? WHERE id=?'; 
    con.query(sql, [status, id], (err, result) => { 
      con.end(); 
      if (err) return res.status(500).json({ error: err.message }); 
      res.json({ message: 'Reserva actualizada', affectedRows: result.affectedRows }); 
    }); 
  }); 
}; 


const getAllReservationsAdmin = (req, res) => {
  const con = getConnection();
  con.connect(err => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = 'SELECT * FROM reservations'; // sin filtrar por email
    con.query(sql, (err, results) => {
      con.end();
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
};

module.exports = { 
  getAllReservations, 
  getReservationById, 
  createReservation, 
  updateReservation, 
  deleteReservation, 
  updateReservationStatus,
  getAllReservationsAdmin
};
