const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root1',
    password: 'vasantiPANCHAM123',
    database: 'testdb'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// CRUD Operations

// Insert record
app.post('/insert', (req, res) => {
    const { id, name, email } = req.body;
    const query = 'INSERT INTO users (id, name, email) VALUES (?, ?, ?)';
    db.query(query, [id, name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Record inserted successfully');
    });
});

// Update record
app.post('/update', (req, res) => {
    const { id, name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(query, [name, email, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Record updated successfully');
    });
});

// Delete record
app.post('/delete', (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Record deleted successfully');
    });
});

// Show table
app.get('/show-table', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});