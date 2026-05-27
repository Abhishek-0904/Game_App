const { pool } = require("../config/db");

const getBankdetails = async (req, res) => {
    const sql = "SELECT * FROM bank_details";
    try {
        const [result] = await pool.execute(sql);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching bank details:", err);
        res.status(500).json({ message: "Error fetching bank details" });
    }
};

const addbankdetails = async (req, res) => {
    const { account_holder_name, bank_name, account_number, ifsc_code } = req.body;
    const sql = "INSERT INTO bank_details (account_holder_name, bank_name, account_number, ifsc_code) VALUES (?, ?, ?, ?)";
    try {
        await pool.execute(sql, [account_holder_name, bank_name, account_number, ifsc_code]);
        res.status(200).json({ message: "Bank Details Added Successfully" });
    } catch (err) {
        console.error("Error Adding Bank Details:", err);
        res.status(500).json({ message: "Error Adding Bank Details" });
    }
};

module.exports = { getBankdetails, addbankdetails };


