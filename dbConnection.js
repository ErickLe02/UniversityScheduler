const mysql = require('mysql2');
const fs = require('fs');
const sqlFile = "classList.sql";

// Connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysql'  // Use the default 'mysql' database for checking if 'isp_prj' exists
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error("Could not connect to MySQL: ", err);
        return;
    }

    console.log("Connected to MySQL database");

    // Check if the database 'isp_prj' exists; create it if it doesn't
    const checkDatabase = `CREATE DATABASE IF NOT EXISTS isp_prj`;

    connection.query(checkDatabase, (err) => {
        if (err) {
            console.error('Error creating database: ', err);
            connection.end();
            return;
        }

        console.log('Database "isp_prj" created or already exists');

        // Switch to 'isp_prj' database
        connection.changeUser({ database: 'isp_prj' }, (err) => {
            if (err) {
                console.error('Error switching to database "isp_prj": ', err);
                connection.end();
                return;
            }

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
    });
});