const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'be34e68d95fea6',
    password: '559eaed6',
    database: 'heroku_9c406cf3bfbf88d',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
