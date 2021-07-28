const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Database
const db = require("./config/database");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());

// checking connection
(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use("/api", require("./Api/routes"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
