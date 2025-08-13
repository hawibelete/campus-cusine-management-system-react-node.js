import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = await mysql.createPool({
    host: process.env.UNIVERSITY_DB_HOST,
    user: process.env.UNIVERSITY_DB_USER,
    password: process.env.UNIVERSITY_DB_PASSWORD,
    database: process.env.UNIVERSITY_DB_NAME
});

export default db;
