const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  try {
    if (!accessToken) return res.json({ error: "User not logged in!" });
    const validToken = verify(accessToken, "importantsecret");
    if (validToken) {
      req.user = validToken;
      return next();
    }; 
  } catch (err) {
    return res.json({ message: 'Toket inválido', error: err });
  }
};

module.exports = { validateToken };