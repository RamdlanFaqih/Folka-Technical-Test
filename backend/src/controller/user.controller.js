import { generateToken } from "../helper/jwt.js";
import model from "../model/user.model.js";
import bcrypt from "bcrypt";

const userController = {
  list: async function (req, res) {
    try {
      const result = await model.listUsers();
      res.status(200).json({
        message: "List users successfully",
        data: result,
      });
    } catch (err) {
      console.log("List users failed", err);
      res.status(500).json({
        message: "Interval Sever Error",
      });
    }
  },
  getUser: async function (req, res) {
    try {
      const id = req.params.id;
      const result = await model.getUser(id);
      res.status(200).json({
        message: "Get User successfully",
        data: result,
      });
    } catch (err) {
      console.log("Get User failed", err);
      res.status(500).json({
        message: "Interval Server Error",
      });
    }
  },
  createUser: async function (req, res) {
    try {
      const { first_name, last_name, email, phone_number, password } = req.body;

      if (!password) {
        return res.status(400).json({ message: "Password is required." });
      }

      const hash = await bcrypt.hash(password, 10);
      const result = await model.postUser(
        first_name,
        last_name,
        email,
        phone_number,
        hash
      );
      res.status(200).json({
        message: "Create User Successfully",
        data: result.rows,
      });
    } catch (err) {
      console.log("Error Hashing Password", err.message);
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,

      });
    }
  },
  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email or Password are required",
        });
      }
      const result = await model.login(email);
      if (result.rows.length > 0) {
        const users_email = result.rows[0].email;
        const users_password = result.rows[0].password;
        const compare = await bcrypt.compare(password, users_password);
        console.log(compare);

        if (compare) {
          const token = await generateToken({
            email: users_email,
          });
          res.json({
            message: "Login successfully",
            generateToken: token,
          });
        } else {
          res.json({
            message: "Login Failed",
          });
        }
      }
    } catch (err) {
      res.status(500).json({ message: "Interval Server Error" });
    }
  },
  update: async function (req, res) {
    try {
      const { id } = req.params;
      const oldData = await model.getUser(id);

      if (!oldData.rowCount) {
        return res.json({ message: "Data tidak ditemukan" });
      }
      let password;
      if (req.body.password) {
        password = await bcrypt.hash(req.body.password, 10);
      } else {
        password = oldData.rows[0].password;
      }
      const { first_name, last_name, email, phone_number } = req.body;
      const oldUserData = oldData.rows[0];
      const newData = {
        first_name: first_name || oldUserData.first_name,
        last_name: last_name || oldUserData.last_name,
        email: email || oldUserData.email,
        phone_number: phone_number || oldUserData.phone_number,
        password: password,
      };
      const result = await model.updateUser(id, newData);
      res.status(200).json({
        message: "Update data successfully",
        data: result,
      });
    } catch (err) {
      console.error("Error during update", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  delete : async function (req, res) {
    try {
        const {id} = req.params;
        const result = await model.destroy(id);
        if (result) {
            res.status(200).json({
                message: "Data deleted successfully",
                data: result,
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Interval Server Error"
        });
    }
  }
};

export default userController;
