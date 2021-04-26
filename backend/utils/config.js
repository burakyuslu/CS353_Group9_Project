/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const DB_HOST = process.env.DB_HOST
const BD_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// if (process.env.NODE_ENV === 'test') {
  // MONGODB_URI = process.env.TEST_MONGODB_URI
// }



module.exports = {
  MONGODB_URI,
  PORT,
  DB_HOST,
  BD_USER,
  DB_PASSWORD,
  DB_NAME,
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  listPerPage: process.env.LIST_PER_PAGE || 10,
}
