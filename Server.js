// server.js

const express = require('express');
const app = express();
const db = require('./dbConnection.js'); // Import your database connection
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/getData', async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM your_table'); // Example query
        res.json(data.rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
