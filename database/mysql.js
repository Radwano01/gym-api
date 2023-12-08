const sql = require("mysql")
require("dotenv").config()

const db = sql.createConnection(process.env.DATABASE_URL)

module.exports = {
    db
}

