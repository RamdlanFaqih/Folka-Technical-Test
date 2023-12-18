import db from "../config/db.js";

const userModel = {
  listUsers: function () {
    try {
      return db.query("SELECT * FROM users");
    } catch (err) {
      console.log(err.message);
    }
  },
  getUser: function (id) {
    try {
      return db.query(`SELECT * FROM users WHERE id = ${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
  postUser: function (first_name, last_name, email, phone_number, password) {
    try {
      return db.query(
        `INSERT INTO users (first_name, last_name, email, phone_number, password) 
        VALUES ('${first_name}', '${last_name}', '${email}', '${phone_number}', '${password}')`
      );
    } catch (err) {
      console.log(err.message);
    }
  },
  login: function (email) {
    try {
      return db.query(`SELECT * FROM users WHERE email='${email}'`);
    } catch (err) {
      console.log(err.message);
    }
  },
  updateUser: function (
    id,
    first_name,
    last_name,
    email,
    phone_number,
    password
  ) {
    try {
      return db.query(
        `UPDATE users SET first_name='${first_name}', last_name='${last_name}', email='${email}', phone_number='${phone_number}', password='${password}' WHERE id='${id}'`
      );
    } catch (err) {
      console.log(err.message);
    }
  },
  destroy: function (id) {
    try {
      return db.query(`DELETE FROM users WHERE id = ${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default userModel;
