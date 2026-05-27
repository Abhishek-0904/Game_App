const { pool } = require('../config/db');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists using raw query
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
            'SELECT id, username, email FROM Users WHERE email = ?',
            [email]
        );

        res.status(201).json({
            message: "User created successfully",
            user: newUsers[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email using raw query
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
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };


