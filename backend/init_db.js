require('dotenv').config();
const { pool } = require('./config/db');

const init = async () => {
    try {
        console.log("Creating tables...");

        // Bank Details Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS bank_details (
                id INT AUTO_INCREMENT PRIMARY KEY,
                account_holder_name VARCHAR(255) NOT NULL,
                bank_name VARCHAR(255) NOT NULL,
                account_number VARCHAR(50) NOT NULL,
                ifsc_code VARCHAR(20) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // UPI Details Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS upi_details (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Phone_Number VARCHAR(15),
                Paytm_number VARCHAR(15),
                Google_pay_number VARCHAR(15),
                Upi_ID VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Users Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log("Tables created successfully!");
        process.exit();
    } catch (err) {
        console.error("Error creating tables:", err);
        process.exit(1);
    }
};

init();
