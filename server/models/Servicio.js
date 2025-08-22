const { getConnection } = require('../db');

const getAllServices = (callback) => {
  const con = getConnection();
  con.connect(err => {
    if (err) return callback(err);
    con.query('SELECT * FROM services', (err, results) => {
      con.end();
      callback(err, results);
    });
  });
};

const createService = (data, callback) => {
  const { name, description, price, duration_minutes } = data;
  const con = getConnection();
  con.connect(err => {
    if (err) return callback(err);
    const sql = 'INSERT INTO services (name, description, price, duration_minutes) VALUES (?, ?, ?, ?)';
    con.query(sql, [name, description, price, duration_minutes], (err, result) => {
      con.end();
      callback(err, result);
    });
  });
};

module.exports = { getAllServices, createService };
