const jwt = require("jsonwebtoken");

const auth = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "unauthenticated user." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    return res.status(200).json({ message: "authenticated user." });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = { auth };