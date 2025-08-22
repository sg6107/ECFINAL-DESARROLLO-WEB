const { getConnection } = require('../db');

const findUserByEmail = (email, callback) => {
  const con = getConnection();
  con.connect(err => {
    if (err) return callback(err);
    con.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      con.end();
      callback(err, results[0]);
    });
  });
};

const createUser = (email, passwordHash, role, callback) => {
  const con = getConnection();
  con.connect(err => {
    if (err) return callback(err);
    const sql = 'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)';
    con.query(sql, [email, passwordHash, role], (err, result) => {
      con.end();
      callback(err, result);
    });
  });
};

module.exports = { findUserByEmail, createUser };
