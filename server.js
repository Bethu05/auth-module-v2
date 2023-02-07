const express = require("express");
const cors = require("cors");
const fs = require("fs")

const file = fs.readFileSync("./D9C8D147A0CB31FA98792612697468F2.txt")
const app = express();

var corsOptions = {
  origin: "*",
  // origin: "http://localhost:8081",
  origin: "http://100.25.182.245:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

app.get("/.well-known/pki-validation/D9C8D147A0CB31FA98792612697468F2.txt",(req,res)=>{
  res.sendFile("/home/ubuntu/auth-module-v2/D9C8D147A0CB31FA98792612697468F2.txt")
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Nodejs Authentication application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/roles.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "student",
  });

  Role.create({
    id: 3,
    name: "teacher",
  });

  Role.create({
    id: 4,
    name: "accountant",
  });

  Role.create({
    id: 5,
    name: "admin",
  });
}
