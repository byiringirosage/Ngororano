const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

// CRUD for Car
app.get('/api/cars', (req, res) => {
  db.query('SELECT * FROM Car', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/cars', (req, res) => {
  const { license_plate, type_model, year_of_manufacture, driver_phone } = req.body;
  db.query(
    'INSERT INTO Car (license_plate, type_model, year_of_manufacture, driver_phone) VALUES (?, ?, ?, ?)',
    [license_plate, type_model, year_of_manufacture, driver_phone],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId });
    }
  );
});

// CRUD for Service
app.get('/api/services', (req, res) => {
  db.query('SELECT * FROM Service', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/services', (req, res) => {
  const { service_name, price } = req.body;
  db.query(
    'INSERT INTO Service (service_name, price) VALUES (?, ?)',
    [service_name, price],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId });
    }
  );
});

// CRUD for ServiceRecord
app.get('/api/service-records', (req, res) => {
  db.query('SELECT * FROM ServiceRecord', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/service-records', (req, res) => {
  const { car_id, service_id, service_date } = req.body;
  db.query(
    'INSERT INTO ServiceRecord (car_id, service_id, service_date) VALUES (?, ?, ?)',
    [car_id, service_id, service_date],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId });
    }
  );
});

// CRUD for Payment
app.get('/api/payments', (req, res) => {
  db.query('SELECT * FROM Payment', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/payments', (req, res) => {
  const { record_id, amount_paid, payment_date } = req.body;
  db.query(
    'INSERT INTO Payment (record_id, amount_paid, payment_date) VALUES (?, ?, ?)',
    [record_id, amount_paid, payment_date],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId });
    }
  );
});

// Reports endpoint
app.get('/api/reports/payments', (req, res) => {
  db.query(
    'SELECT p.payment_id, c.license_plate, s.service_name, p.amount_paid, p.payment_date ' +
    'FROM Payment p JOIN ServiceRecord sr ON p.record_id = sr.record_id ' +
    'JOIN Car c ON sr.car_id = c.car_id JOIN Service s ON sr.service_id = s.service_id',
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.listen(5000, () => console.log('Server running on port 5000'));