const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Set to true if you want to see SQL queries
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connected (Sequelize)...');

        // Sync models
        await sequelize.sync();
        console.log('Database synced');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
