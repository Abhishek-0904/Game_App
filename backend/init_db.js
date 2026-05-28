require('dotenv').config({ path: require('path').resolve(__dirname, './.env') });
const { pool } = require('./config/db');

const init = async () => {
    try {
        console.log("Dropping existing tables for clean slate...");
        await pool.execute('SET FOREIGN_KEY_CHECKS = 0');
        await pool.execute('DROP TABLE IF EXISTS user_wallet_history');
        await pool.execute('DROP TABLE IF EXISTS user_wallet');
        await pool.execute('DROP TABLE IF EXISTS upi_details');
        await pool.execute('DROP TABLE IF EXISTS bank_details');
        await pool.execute('DROP TABLE IF EXISTS Users');
        await pool.execute('DROP TABLE IF EXISTS user_wallet_type');
        await pool.execute('DROP TABLE IF EXISTS user_wallet_status');
        await pool.execute('SET FOREIGN_KEY_CHECKS = 1');

        console.log("Creating tables...");

        // Users Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS Users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);


        // Bank Details Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS bank_details (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                account_holder_name VARCHAR(255) NOT NULL,
                bank_name VARCHAR(255) NOT NULL,
                account_number VARCHAR(50) NOT NULL,
                ifsc_code VARCHAR(20) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                UNIQUE (user_id)
            )
        `);

        // UPI Details Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS upi_details (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                Phone_Number VARCHAR(15),
                Paytm_number VARCHAR(15),
                Google_pay_number VARCHAR(15),
                Upi_ID VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                UNIQUE (user_id)
            )
        `);

        //create table User Wallet
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_wallet (
            user_id INT PRIMARY KEY,
            points INT,
            Big_Int BIGINT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);


        // User Wallet Type Table (Static)
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_wallet_type (
                id INT PRIMARY KEY,
                name VARCHAR(50) NOT NULL
            )
        `);

        // Seed Wallet Types
        const walletTypes = [
            [1, 'Deposit'],
            [2, 'Withdrawal'],
            [3, 'Bid placed'],
            [4, 'Bid won'],
            [5, 'Bonus']
        ];
        for (const [id, name] of walletTypes) {
            await pool.execute('INSERT IGNORE INTO user_wallet_type (id, name) VALUES (?, ?)', [id, name]);
        }

        // create table user_wallet_history
        await pool.execute(`
          CREATE TABLE IF NOT EXISTS user_wallet_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            type_id INT,
            transaction_type TINYINT DEFAULT 0 COMMENT '0: Debit, 1: Credit',
            market_id INT DEFAULT 0,
            amount DECIMAL(12,2) DEFAULT 0,
            description VARCHAR(255),
            points BIGINT,
            status_id INT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (type_id) REFERENCES user_wallet_type(id)
        )
        `);

        // User Wallet Status Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_wallet_status (
                id INT PRIMARY KEY,
                status_name VARCHAR(50) NOT NULL UNIQUE
            )
        `);

        // Seed Wallet Statuses
        const statuses = [
            [1, 'pending'],
            [2, 'completed'],
            [3, 'cancelled by admin']
        ];
        for (const [id, name] of statuses) {
            await pool.execute('INSERT IGNORE INTO user_wallet_status (id, status_name) VALUES (?, ?)', [id, name]);
        }


        console.log("Tables created and seeded successfully!");


        process.exit();
    } catch (err) {
        console.error("Error creating tables:", err);
        process.exit(1);
    }
};

init();
