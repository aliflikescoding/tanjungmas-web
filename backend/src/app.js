const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pageRoutes = require("./routes/page.routes");
const tentangRoutes = require("./routes/tentang.routes");
const layananRoutes = require("./routes/layanan.routes");
const infoRoutes = require("./routes/info.routes");
const beritaRoutes = require("./routes/berita.routes");
const loginRoutes = require("./routes/login.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const port = process.env.port || 5000;

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

// Serve static files
app.use(express.static("public")); // This serves files from the "public" folder

// Routes
app.use(authRoutes);
app.use(pageRoutes);
app.use(tentangRoutes);
app.use(layananRoutes);
app.use(infoRoutes);
app.use(beritaRoutes);
app.use(loginRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
