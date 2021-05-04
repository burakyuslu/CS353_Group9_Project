const mysql = require('mysql2/promise');
const config = require('../utils/config');

let connection

async function query(sql, params) {
    connection = await mysql.createConnection(config.db);
    const [results,] = await connection.execute(sql, params);

    return results;
}

module.exports = {
    connection,
    query
}