const sql = require("mysql")

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3307,
    database: "gymdata",
    connectTimeout: 10,
})

module.exports = {
    db
}