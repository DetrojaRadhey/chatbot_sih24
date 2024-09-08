// import mysql from 'mysql2/promise';
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'SIH24',
            password: process.env.SQL_PASSWORD
        });
        return connection;
    } catch (error) {
        console.log("Something is wrong ", error);
        throw error;
    }
}

module.exports = connectDB