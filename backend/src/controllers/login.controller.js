const { PrismaClient } = require('@prisma/client');
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const combinedPassword = password + process.env.PASSWORD_SALT;

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(combinedPassword, admin.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: admin.id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  res.json({ message: "Logged in successfully!" });
}

module.exports = { adminLogin };