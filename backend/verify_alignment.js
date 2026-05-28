const { pool } = require('./config/db');

async function verify() {
    try {
        console.log("--- Tables ---");
        const [tables] = await pool.execute("SHOW TABLES");
        console.log(tables);

        console.log("\n--- Wallet Types ---");
        const [types] = await pool.execute("SELECT * FROM user_wallet_type");
        console.table(types);

        console.log("\n--- Wallet Statuses ---");
        const [statuses] = await pool.execute("SELECT * FROM user_wallet_status");
        console.table(statuses);

        console.log("\n--- Wallet History Schema ---");
        const [historyCols] = await pool.execute("DESCRIBE user_wallet_history");
        console.table(historyCols);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

verify();
