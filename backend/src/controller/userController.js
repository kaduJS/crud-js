const db = require("../database/dbConfig");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

function encryptPassword(password) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

module.exports = {
  createUser: async function (req, res) {
    const content = {
      name: req.body.name,
      email: req.body.email,
      password: encryptPassword(req.body.password),
      admin: req.body.admin,
    };

    if (
      content.name !== undefined &&
      content.email !== undefined &&
      content.password !== undefined
    ) {
      await db("user")
        .insert(content)
        .then(() => {
          return res.status(200).send("User created");
        })
        .catch((err) => {
          return res.status(500).send("error to create user " + err);
        });
    } else {
      return res
        .status(500)
        .send("something wrong happened. please, check all fields");
    }
  },

  update: async function (req, res) {
    const id = req.params.id;
    const content = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin,
      updated_at: db.fn.now(),
    };

    await db("user")
      .update(content)
      .where({ id })
      .then(() => res.status(204).send());
  },

  delete: async function (req, res) {
    const id = req.params.id;

    await db("user")
      .del()
      .where({ id })
      .then(() => res.status(204).send());
  },

  get: async function (req, res) {
    db("user").then((db) => res.status(200).json(db));
  },

  getById: async function (req, res) {
    const id = req.params.id;

    db("user")
      .where({ id })
      .then((db) => res.status(200).json(...db));
  },

  validatePassword: async function (req, res) {
    const id = req.params.id;
    const password = req.body.password;

    const user = await db("user")
      .where({ id })
      .select("password")
      .then((user) => {
        return user[0].password;
      });

    const isMatch = compareSync(password, user);

    return res.status(200).json(isMatch);
  },
};
