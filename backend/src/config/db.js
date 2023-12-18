/* eslint-disable no-undef */
import pg from "pg";
import "dotenv/config";

const db = new pg.Pool({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    port : process.env.DB_PORT || 5432,
});

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err));

export default db;