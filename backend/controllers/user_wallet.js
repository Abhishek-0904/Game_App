const { pool } = require("../config/db");

const getuser = async (req, res) => {
    const sql = "SELECT * FROM user_wallet";
    try {
        const [result] = await pool.execute(sql);
        res.status(200).json({ message: "User Wallet Fetched Successfully", data: result });
    } catch (err) {
        console.error("Error Fetching User Wallet:", err);
        res.status(500).json({ message: "Error Fetching User Wallet", error: err.message });
    }
};

const adduser = async (req, res) => {
    const { user_id, points, Big_Int } = req.body;
    const sql = "INSERT INTO user_wallet (user_id, points, Big_Int) VALUES (?, ?, ?)";
    try {
        await pool.execute(sql, [user_id || null, points || 0, Big_Int || 0]);
        res.status(200).json({ message: "User Wallet Added Successfully" });
    } catch (err) {
        console.error("Error Adding User Wallet:", err);
        res.status(500).json({ message: "Error Adding User Wallet", error: err.message });
    }
};

const updateuser = async (req, res) => {
    const { user_id, points, Big_Int } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required for update" });
    }
    const sql = "UPDATE user_wallet SET points = ?, Big_Int = ? WHERE user_id = ?";

    try {
        await pool.execute(sql, [points || 0, Big_Int || 0, user_id]);
        res.status(200).json({ message: "User Wallet Updated Successfully" });
    } catch (err) {
        console.error("Error Updating User Wallet:", err);
        res.status(500).json({ message: "Error Updating User Wallet", error: err.message });
    }
};

module.exports = { getuser, adduser, updateuser };
