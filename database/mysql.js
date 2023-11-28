const sql = require("mysql")
require("dotenv").config()

const db = sql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE,
    connectionLimit: 10
})

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
  connection.release();
});

module.exports = {
    db
}
