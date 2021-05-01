const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'tom',
    password: '123456',
    database: 'merntodo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;