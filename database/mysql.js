const sql = require("mysql")
require("dotenv").config()

const db = sql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE,
})

db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
});

module.exports = {
    db
}
