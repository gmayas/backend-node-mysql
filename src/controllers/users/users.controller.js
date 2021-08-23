const { Users } = require('../../models');
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");


const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.json({ error: "User Doesn't Exist" });

    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: "Wrong Username And Password Combination" });
      //Token
      const accessToken = sign({ username: user.username, id: user.id }, "importantsecret",
        {
          expiresIn: 60 * 60 * 24 // Duracion de 24 hrs
        });
      res.json({ token: accessToken, username: username, id: user.id, message: "Login Success", Ok: true });
    });
  } catch (e) {
    console.log(e);
    return res.json({ error: "Error in query:" + e })
  }
};


const Register = async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
};


module.exports = { Login, Register };