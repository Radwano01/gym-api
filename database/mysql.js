const sql = require("mysql")
require("dotenv").config()

const db = sql.createPool(process.env.DATABASE_URL)

db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to mysql');
});

module.exports = {
    db
}

