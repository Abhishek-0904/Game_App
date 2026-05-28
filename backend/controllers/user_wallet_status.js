const { pool } = require("../config/db");

const getuser_wallet_status = async (req, res) => {
    const sql = "SELECT * FROM user_wallet_status";
    try {
        const [result] = await pool.execute(sql);
        res.status(200).json({ message: "User Wallet Statuses Fetched Successfully", data: result });
    } catch (err) {
        console.error("Error Fetching User Wallet Status:", err);
        res.status(500).json({ message: "Error Fetching User Wallet Status" });
    }
};

const adduser_wallet_status = async (req, res) => {
    const { status_name } = req.body;
    if (!status_name) {
        return res.status(400).json({ message: "status_name is required" });
    }
    const sql = "INSERT INTO user_wallet_status (status_name) VALUES (?)";
    try {
        await pool.execute(sql, [status_name]);
        res.status(200).json({ message: "User Wallet Status Added Successfully" });
    } catch (err) {
        console.error("Error Adding User Wallet Status:", err);
        res.status(500).json({ message: "Error Adding User Wallet Status" });
    }
};

const updateuser_wallet_status = async (req, res) => {
    const { id, status_name } = req.body;

    if (!id || !status_name) {
        return res.status(400).json({ message: "ID and status_name are required for update" });
    }
    const sql = "UPDATE user_wallet_status SET status_name = ? WHERE id = ?";

    try {
        await pool.execute(sql, [status_name, id]);
        res.status(200).json({ message: "User Wallet Status Updated Successfully" });
    } catch (err) {
        console.error("Error Updating User Wallet Status:", err);
        res.status(500).json({ message: "Error Updating User Wallet Status" });
    }
};

module.exports = { getuser_wallet_status, adduser_wallet_status, updateuser_wallet_status };
