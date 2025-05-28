const mysql2 = require('mysql2');
require('dotenv').config();

const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_Password,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if(err)
    {
        console.error('Connect Database Failed');
        return;
    }
    console.log('Connected to Database Success');
})

module.exports = connection.promise();