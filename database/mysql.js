const sql = require("mysql")
require("dotenv").config()

const db = sql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectTimeout: parseInt(process.env.CONNECT_TIMEOUT || "10000", 10),
  port: parseInt(process.env.PORT, 10),
  ssl: {
    rejectUnauthorized: true,
  },
});

module.exports = {
    db
}

