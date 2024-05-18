import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getCoins() {
    const [rows] = await pool.query("SELECT * FROM owners")    
    return rows
}

export async function getCoin(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM coins
        WHERE id = ?
        `, [id])
        return rows[0]
}

export async function addOwnedCoin(title, content) {
    await pool.query(`
    INSERT INTO notes (title, content)
    VALUES (?, ?)
    `, [title, content])
}
