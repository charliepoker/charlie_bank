const express = require("express");
const app = express();
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

// database
const db = require("./models");

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

// app.use("/api", require("./routes/user-route.js"));
// routes
require("./routes/user-route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
