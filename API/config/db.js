const mysql2 = require('mysql2');
require('dotenv').config();

const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if(err)
    {
        console.error(`Connect Database Failed ${process.env.DB_NAME}`, err);
        return;
    }
    console.log('Connected to Database Success');
})

module.exports = connection.promise();