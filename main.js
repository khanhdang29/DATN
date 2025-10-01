const express = require("express");
const pool = require("./config/db"); // import pool MySQL
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
