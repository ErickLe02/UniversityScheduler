const mysql = require('mysql2');
const fs = require('fs');
const sqlFile = "classList.sql";

// Connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'isp_prj'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error("Could not connect to MySQL: ", err);
        return;
    }

    console.log("Connected to MySQL database");

    // Check if the table exists; initialize if it doesn't
    const tableName = "class_list";
    const checkTable = `SHOW TABLES LIKE '${tableName}'`;

    connection.query(checkTable, (err, results) => {
        if (err) {
            console.error('Error checking for table: ', err);
            connection.end();
            return;
        }

        if (results.length === 0) {
            // Read SQL file and split queries
            const sqlQueries = fs.readFileSync(sqlFile, 'utf8').split(';');

            // Execute each query sequentially
            sqlQueries.forEach((query) => {
                if (query.trim() !== '') {
                    connection.query(query, (err) => {
                        if (err) {
                            console.error('Error executing query: ', err);
                        } else {
                            console.log('Query executed successfully');
                        }
                    });
                }
            });

            // Close the connection after all queries have been executed
            connection.end();
        } else {
            // Table already exists, close the connection
            connection.end();
        }
    });
});