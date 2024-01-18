// server.js

const express = require('express');
const app = express();
const db = require('./dbConnection.js'); // Import your database connection
const path = require('path');
const mysql = require('mysql2/promise');
// Meow
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/addClasses', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addClasses.html'));
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

        connection.release();

        // responds with the data that was retrieved
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
    }
});

app.get('/getMyData', async (req, res) => {
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
        const [rows] = await connection.query('SELECT * FROM user_classes');

        connection.release();

        // responds with the data that was retrieved
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
    }
});

app.use(express.json());

app.post('/copyRow', async (req, res) => {  // used copy values from class_list to user_classes
    try {
        const { id } = req.body;

        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'isp_prj',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        const connection = await pool.getConnection();

        connection.query(`UPDATE class_list SET currentCapacity = currentCapacity + 1 WHERE courseId = ${id};`)
        const [result] = await connection.query(`INSERT INTO user_classes SELECT * FROM class_list WHERE courseId = ${id};`);

        connection.release();

        // Respond with the result
        res.json({ success: true, message: 'Row copied successfully' });
    } catch (error) {
        console.error('Error copying row:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});


app.post('/deleteRow', async (req, res) => {  // used to delete a row from user_classes
    try {
        const { id } = req.body;


        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'isp_prj',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        const connection = await pool.getConnection();

        const [result] = await connection.query(`DELETE FROM user_classes WHERE courseId = ${id};`);
        connection.query(`UPDATE class_list SET currentCapacity = currentCapacity - 1 WHERE courseId = ${id};`)

        connection.release();

        // Respond with the result
        res.json({ success: true, message: 'Row deleted successfully' });
    } catch (error) {
        console.error('Error deleting row:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});


const PORT = process.env.PORT || 8080;  // listens to port 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
