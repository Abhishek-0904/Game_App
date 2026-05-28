const { pool } = require('../config/db');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "username, email and password are required" });
        }

        // Check DB connectivity before running queries
        try {
            const conn = await pool.getConnection();
            conn.release();
        } catch (dbErr) {
            console.error('DB connection error during register:', dbErr);
            return res.status(503).json({
                message: 'Database service is currently unavailable. Please ensure your MySQL server is running.',
                error: dbErr.code
            });
        }

        // Check if user already exists using raw query
        try {
            const [existingUsers] = await pool.execute(
                'SELECT * FROM Users WHERE email = ?',
                [email]
            );

            if (existingUsers.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Create new user using raw query
            await pool.execute(
                'INSERT INTO Users (username, email, password, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
                [username, email, password]
            );

            // Fetch the newly created user to return it
            const [newUsers] = await pool.execute(
                'SELECT user_id, username, email FROM Users WHERE email = ?',
                [email]
            );

            res.status(201).json({
                message: "User created successfully",
                user: newUsers[0]
            });
        } catch (queryErr) {
            console.error('Database query error:', queryErr);
            if (queryErr.code === 'ER_NO_SUCH_TABLE') {
                return res.status(500).json({ message: "Database tables are missing. Please run the initialization script (node init_db.js)." });
            }
            return res.status(500).json({ message: "Database query error", error: queryErr.message });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check DB connectivity
        try {
            const conn = await pool.getConnection();
            conn.release();
        } catch (dbErr) {
            console.error('DB connection error during login:', dbErr);
            return res.status(503).json({
                message: 'Database service is unavailable. Please ensure your MySQL server is running.',
                error: dbErr.code
            });
        }

        // Find user by email using raw query
        try {
            const [users] = await pool.execute(
                'SELECT * FROM Users WHERE email = ?',
                [email]
            );

            if (users.length === 0) {
                return res.status(400).json({ message: "Invalid User" });
            }

            const user = users[0];

            // Check password (temporary plain-text comparison)
            const isMatch = (password === user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid Password" });
            }

            res.status(200).json({
                message: "Login successfully",
                user: {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (queryErr) {
            console.error('Database query error during login:', queryErr);
            return res.status(500).json({ message: "Database query error", error: queryErr.message });
        }
    } catch (error) {
        console.error('Unexpected error during login:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };


