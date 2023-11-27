const sql = require("mysql")
require("dotenv").config()

const db = sql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATA_NAME,
})

module.exports = {
    db
}
