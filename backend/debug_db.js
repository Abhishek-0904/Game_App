const { pool } = require('./config/db');

async function debugSchema() {
    try {
        const [rows] = await pool.execute("SHOW CREATE TABLE bank_details");
        console.log("CREATE TABLE bank_details:");
        console.log(rows[0]['Create Table']);

        const [users] = await pool.execute("SELECT user_id, email FROM users");
        console.log("\nExisting Users:");
        console.table(users);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

debugSchema();
