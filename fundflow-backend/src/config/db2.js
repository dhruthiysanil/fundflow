const mysql = require("mysql");
require("dotenv").config();

const { promisify } = require("util");

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Maximum number of connections
    queueLimit: 0,       // No limit on connection queue
});


pool.query = promisify(pool.query);


module.exports = pool;
