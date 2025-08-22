//node seed/seed.js en terminal en server

require('dotenv').config();

const fs = require('fs');
const { getConnection } = require('../db/db');

const data = JSON.parse(fs.readFileSync(__dirname + '/seed.json', 'utf8'));

const conn = getConnection();

conn.connect(err => {
  if (err) throw err;
  console.log('Conectado a la BDD');

  data.users.forEach(u => {
    conn.query(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
      [u.email, u.password, u.role],
      (err) => { if (err) console.error('Error usuario:', err); }
    );
  });

  data.services.forEach(s => {
    conn.query(
      'INSERT INTO services (name, description, price, duration_minutes) VALUES (?, ?, ?, ?)',
      [s.name, s.description, s.price, s.duration_minutes],
      (err) => { if (err) console.error('Error servicio:', err); }
    );
  });

  data.reservations.forEach(r => {
    conn.query(
      'INSERT INTO reservations (service_id, customer_name, customer_email, date, time, status) VALUES (?, ?, ?, ?, ?, ?)',
      [r.service_id, r.customer_name, r.customer_email, r.date, r.time, r.status],
      (err) => { if (err) console.error('Error reserva:', err); }
    );
  });

  console.log('Datos de ejemplo cargados');
  conn.end();
});
