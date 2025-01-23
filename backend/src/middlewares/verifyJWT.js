const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  // Get the token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace with your secret key
    req.user = decoded; // Attach the decoded user data (e.g., id) to the request
    next(); // Allow the request to proceed
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = verifyJWT;
