const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "naveen",
    database: "eventhub_db"
});

db.connect((error) => {
    if (error) {
        console.error("MySQL connection failed:", error.message);
        return;
    }

    console.log("MySQL Database Connected Successfully!");
});

module.exports = db;