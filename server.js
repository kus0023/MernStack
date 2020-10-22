const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();

//middleware
app.use(express.json());

//database connnect
require("./config/database");

//routes for items
app.use("/api/items", require("./routes/api/Items"));
app.use("/api/user", require("./routes/api/Users"));
app.use("/api/auth", require("./routes/api/auth"));

//serve static asset if in production

if (process.env.NODE_ENV === "production") {
  //set Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started at port: " + PORT));
