const { pool } = require('./config/db');

async function checkUsers() {
    try {
        const [users] = await pool.execute("SELECT user_id, username, email FROM Users");
        console.log("Current Users in DB:");
        console.table(users);
        process.exit(0);
    } catch (err) {
        console.error("Error checking users:", err);
        process.exit(1);
    }
}

checkUsers();
