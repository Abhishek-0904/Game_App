const { pool } = require('./config/db');

async function checkUPI() {
    try {
        const [rows] = await pool.execute("SELECT COUNT(*) as count FROM upi_details");
        console.log(`Total rows in upi_details: ${rows[0].count}`);

        const [data] = await pool.execute("SELECT * FROM upi_details");
        console.log("Data in upi_details:");
        console.log(data);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUPI();
