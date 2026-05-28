const { pool } = require("../config/db");

const getUpiDetails = async (req, res) => {
    const sql = "SELECT * FROM upi_details";
    try {
        const [result] = await pool.execute(sql);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching Upi details:", err);
        res.status(500).json({ message: "Error fetching Upi details", error: err.message });
    }
};

const addUpiDetails = async (req, res) => {
    const { user_id, Phone_Number, Paytm_number, Google_pay_number, Upi_ID } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const sql = "INSERT INTO upi_details (user_id, Phone_Number, Paytm_number, Google_pay_number, Upi_ID) VALUES (?, ?, ?, ?, ?)";

    try {
        await pool.execute(sql, [
            user_id || null,
            Phone_Number || null,
            Paytm_number || null,
            Google_pay_number || null,
            Upi_ID || null
        ]);
        res.status(200).json({ message: "Upi Details Added Successfully" });
    } catch (err) {
        console.error("Error Adding Upi Details:", err);
        res.status(500).json({ message: "Error Adding Upi Details", error: err.message });
    }
};

const updateUpiDetails = async (req, res) => {
    const { id, user_id, Phone_Number, Paytm_number, Google_pay_number, Upi_ID } = req.body;

    if (!id) {
        return res.status(400).json({ message: "ID is required for update" });
    }

    const sql = "UPDATE upi_details SET user_id = ?, Phone_Number = ?, Paytm_number = ?, Google_pay_number = ?, Upi_ID = ? WHERE id = ?";
    try {
        await pool.execute(sql, [
            user_id || null,
            Phone_Number || null,
            Paytm_number || null,
            Google_pay_number || null,
            Upi_ID || null,
            id
        ]);
        res.status(200).json({ message: "Upi Details Updated Successfully" });
    } catch (err) {
        console.error("Error Updating Upi Details:", err);
        res.status(500).json({ message: "Error Updating Upi Details", error: err.message });
    }
};

module.exports = { getUpiDetails, addUpiDetails, updateUpiDetails };


