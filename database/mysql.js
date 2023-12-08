const sql = require("mysql")
require("dotenv").config()

const db = sql.createPool(process.env.DATABASE_URL)

module.exports = {
    db
}

