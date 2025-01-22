const express = require("express");
const pageRoutes = require("./routes/page.routes");
const tentangRoutes = require("./routes/tentang.routes");

const app = express();
const port = process.env.port || 5000;

// Middleware
app.use(express.json());

// Routes
app.use(pageRoutes);
app.use(tentangRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
