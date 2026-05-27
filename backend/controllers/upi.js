const { pool } = require("../config/db");

const getUpiDetails = async (req, res) => {
    const sql = "SELECT * FROM upi_details";
    try {
        const [result] = await pool.execute(sql);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error fetching Upi details:", err);
        res.status(500).json({ message: "Error fetching Upi details" });
    }
};

const addUpiDetails = async (req, res) => {
    const { Phone_Number, Paytm_number, Google_pay_number, Upi_ID } = req.body;
    const sql = "INSERT INTO Upi_details (Phone_Number,Paytm_number,Google_pay_number,Upi_ID) VALUES (?, ?, ?, ?)";
    try {
        await pool.execute(sql, [Phone_Number, Paytm_number, Google_pay_number, Upi_ID]);
        res.status(200).json({ message: "Upi Details Added Successfully" });
    } catch (err) {
        console.error("Error Adding Upi Details:", err);
        res.status(500).json({ message: "Error Adding Upi Details" });
    }
};

module.exports = { getUpiDetails, addUpiDetails };


