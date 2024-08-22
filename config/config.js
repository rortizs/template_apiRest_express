require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database, successfully");
});

module.exports = db;
