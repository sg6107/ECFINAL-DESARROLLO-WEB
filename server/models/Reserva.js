const { getConnection } = require('../db');

const getAllReservations = (callback) => {
  const con = getConnection();
  con.connect(err => {
    if (err) return callback(err);
    con.query('SELECT * FROM reservations', (err, results) => {
      con.end();
      callback(err, results);
    });
  });
};

const createReservation = (data, callback) => {
  const { service_id, customer_name, customer_email, date, time, status } = data;
  const con = getConnection();
  con.connect(err => {
    if (err) return callback(err);
    const sql = 'INSERT INTO reservations (service_id, customer_name, customer_email, date, time, status) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(sql, [service_id, customer_name, customer_email, date, time, status], (err, result) => {
      con.end();
      callback(err, result);
    });
  });
};

module.exports = { getAllReservations, createReservation };
