const express = require("express");
const pageRoutes = require("./routes/page.routes");
const tentangRoutes = require("./routes/tentang.routes");
const layananRoutes = require("./routes/layanan.routes");
const infoRoutes = require("./routes/info.routes");
const beritaRoutes = require("./routes/berita.routes");

const app = express();
const port = process.env.port || 5000;

// Middleware
app.use(express.json());

// Routes
app.use(pageRoutes);
app.use(tentangRoutes);
app.use(layananRoutes);
app.use(infoRoutes);
app.use(beritaRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
