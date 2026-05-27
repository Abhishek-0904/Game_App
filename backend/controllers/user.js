const User = require('../models/usermodel');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user (plain text for now as requested, but bcrypt is recommended)
        const newUser = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "Invalid User" });
        }

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
