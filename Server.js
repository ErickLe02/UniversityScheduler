// server.js

const express = require('express');
const app = express();
const db = require('./dbConnection.js'); // Import your database connection
const path = require('path');
const mysql = require('mysql2/promise');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/getData', async (req, res) => {
    try {
        // Create a connection pool
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'isp_prj',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Query the database
        const [rows] = await connection.query('SELECT * FROM class_list');

        // Release the connection back to the pool
        connection.release();

        // Respond with the data
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
