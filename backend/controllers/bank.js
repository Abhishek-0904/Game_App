const { pool } = require("../config/db");

const getBankdetails = async (req, res) => {
    const sql = "SELECT * FROM bank_details";
    try {
        const [result] = await pool.execute(sql);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching bank details:", err);
        res.status(500).json({ message: "Error fetching bank details", error: err.message });
    }
};

const addbankdetails = async (req, res) => {
    console.log("Adding bank details for body:", req.body);
    const { user_id, account_holder_name, bank_name, account_number, ifsc_code } = req.body;

    if (!user_id || !account_holder_name || !bank_name || !account_number || !ifsc_code) {
        return res.status(400).json({ message: "All fields are required (user_id, account_holder_name, bank_name, account_number, ifsc_code)" });
    }

    const sql = "INSERT INTO bank_details (user_id, account_holder_name, bank_name, account_number, ifsc_code) VALUES (?, ?, ?, ?, ?)";
    try {
        await pool.execute(sql, [
            user_id || null,
            account_holder_name || null,
            bank_name || null,
            account_number || null,
            ifsc_code || null
        ]);
        res.status(200).json({ message: "Bank Details Added Successfully" });
    } catch (err) {
        console.error("Error Adding Bank Details:", err);
        res.status(500).json({ message: "Error Adding Bank Details", error: err.message });
    }
};


const updateBankDetails = async (req, res) => {
    const { id, user_id, account_holder_name, bank_name, account_number, ifsc_code } = req.body;

    if (!id) {
        return res.status(400).json({ message: "ID is required for update" });
    }

    const sql = "UPDATE bank_details SET user_id = ?, account_holder_name = ?, bank_name = ?, account_number = ?, ifsc_code = ? WHERE id = ?";
    try {
        await pool.execute(sql, [
            user_id || null,
            account_holder_name || null,
            bank_name || null,
            account_number || null,
            ifsc_code || null,
            id
        ]);
        res.status(200).json({ message: "Bank Details Updated Successfully" });
    } catch (err) {
        console.error("Error Updating Bank Details:", err);
        res.status(500).json({ message: "Error Updating Bank Details", error: err.message });
    }
};

module.exports = { getBankdetails, addbankdetails, updateBankDetails };


