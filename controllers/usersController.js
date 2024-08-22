const ApiModel = require('../models/apilModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


const UsersController = {
  getUsers: (req, res) => {
    const { id_user, search, perPage = 20, page = 0 } = req.query;
    const start = page ? perPage * page : 0;

    if (user_id) {
      ApiModel.getRowById("users", "id_user", id_user, (err, user) => {
        if (err) return res.status(500).json({ error: err });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).send({ message: "User details", result: user });
      });
    } else {
      const where = search ? `name_user LIKE '%${search}%'` : "";

      ApiModel.get("users", "*", where, perPage, start, (err, users) => {
        if (err) return res.status(500).json({ error: err });
        if (!user || user.length === 0)
          return res.status(404).send({ message: "Users List", result: users });
      });
    }
  },

  createUser: (req, res) => {
    const { name_user, email_user, password_user, ...otherData } = req.body;
    const hashedPassword = bcrypt.hashSync(senha, 10);

    const data = { name_user, email_user, password_user: hashedPassword, ...otherData };

    ApiModel.add("users", data, (err, result) => {
      if (err) return res.status(500).send(err);
      ApiModel.getRowById(
        "users",
        "id_user",
        result.insertId,
        (err, users) => {
          if (err) return res.status(500).send(err);
          res
            .status(201)
            .send({ message: "Edited user success", result: users });
        }
      );
    });
  },

  updateUser: (req, res) => {
    const { id_user } = req.params;
    const { password_user, ...otherData } = req.body;

    const data = { ...otherData };

    if (password_user) {
      data.senha = bcrypt.hashSync(password_user, 10);
    }

    ApiModel.edit("users", data, "id_user", id_user, (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0)
        return res.status(404).send({ message: "User not found" });
      ApiModel.getRowById("users", "id_user", id_user, (err, user) => {
        if (err) return res.status(500).send(err);
        res
          .status(200)
          .send({ message: "Updated user success", result: user });
      });
    });
  },

  deleteUser: (req, res) => {
    const { id_user } = req.params;

    ApiModel.delete("users", "id_user", id_user, (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0)
        return res.status(404).send({ message: "User not found" });
      res.status(200).send({ message: "Deleted user success" });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    ApiModel.getUserByEmail(email, (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user || !bcrypt.compareSync(password, user.password_user)) {
        return res.status(401).send({ message: "Password not found" });
      }

      const token = jwt.sign(
        { id_user: user.id_user, email: user.email_user},
        keys.secretOrKey,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).send({
        message: "Login success",
        token,
        user: {
          id: user.id_user,
          nome: user.name_user,
          email: user.email_user
        },
      });
    });
  },

  getMe: (req, res) => {
    const user_id = req.user.user_id; 

    ApiModel.getUserById(user_id, (err, user) => {
      if (err) {
        console.error("Error user not found:", err);
        return res
          .status(500)
          .send({ message: "Error server fail", error: err });
      }
      if (!user) {
        console.log("User not found from id:", user_id);
        return res.status(404).send({ message: "User not found" });
      }

      res.status(200).send({
        id: user.user_id,
        nome: user.name_user,
        email: user.email_user,
        bairro: user.addess_user,
        cidade: user.phone_user
      });
    });
  },
};

module.exports = UsersController;
