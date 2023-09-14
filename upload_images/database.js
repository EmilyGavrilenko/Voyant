const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit : 10,
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    database: process.env.RDS_DATABASE,
    password: process.env.RDS_PASSWORD,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
});

console.log('Successfully connected to SQL Database');

module.exports = connection;