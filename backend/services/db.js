const mariadb = require('mariadb');
const config = require('../utils/config');
const {emptyOrRows} = require("../utils/helper")

let connection

const pool = mariadb.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
    connectionLimit: config.DB_CONNECTION_LIMIT,
    database: config.DB_NAME
});

async function query(sql, params) {
    let conn, results;
    try {
        conn = await pool.getConnection();
        results  = await conn.query(sql, params)
    } catch (err) {
        throw err;
    } finally {
        if (conn) await conn.end();
    }
    return emptyOrRows(results)
}

module.exports = {
    connection,
    query
}