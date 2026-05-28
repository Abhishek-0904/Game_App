const { pool } = require("../config/db");



const createwalletHistory = async ({ user_id, type_id, transaction_type, market_id, amount, description, points, status_id }) => {
    const sql = `INSERT INTO user_wallet_history (user_id, type_id, transaction_type, market_id, amount, description, points, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    try {
        await pool.execute(sql, [user_id || null, type_id || null, transaction_type || 0, market_id || 0, amount || 0, description || null, points || 0, status_id || null]);
    } catch (err) {
        console.error("Error creating wallet history:", err);
    }
};

const getuser_wallet_history = async (req, res) => {
    const sql = "SELECT * FROM user_wallet_history";
    try {
        const [result] = await pool.execute(sql);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching wallet history:", err);
        res.status(500).json({ message: "Error fetching wallet history", error: err.message });
    }
};

const adduser_wallet_history = async (req, res) => {
    const { user_id, type_id, transaction_type, market_id, amount, description, points, status_id } = req.body;
    const sql = "INSERT INTO user_wallet_history (user_id, type_id, transaction_type, market_id, amount, description, points, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    try {
        await pool.execute(sql, [
            user_id || null,
            type_id || null,
            transaction_type || 0,
            market_id || 0,
            amount || 0,
            description || null,
            points || 0,
            status_id || null
        ]);
        res.status(200).json({ message: "Wallet History Added Successfully" });
    } catch (err) {
        console.error("Error Adding Wallet History:", err);
        res.status(500).json({ message: "Error Adding Wallet History", error: err.message });
    }
};


const updateUserWallet = async ({ userId, points }) => {
    const sql = `
        INSERT INTO user_wallet (user_id, points)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE points = points + VALUES(points), updated_at = CURRENT_TIMESTAMP
    `;
    await pool.execute(sql, [userId, points]);
};

module.exports = { getuser_wallet_history, adduser_wallet_history, updateUserWallet, createwalletHistory };

