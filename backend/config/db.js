const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});





const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL Connected (Direct)...');
        connection.release();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        // Do not exit the process here to allow the server to start for debugging.
    }
};

module.exports = { pool, connectDB };

