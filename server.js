const express = require("express");
const cors = require("cors");
//const fs = require('fs')
//const https = require('https')

//const key = fs.readFile('./privatekey.pem')
//const cert = fs.readFile('./certificate.pem')

const app = express();

var corsOptions = {
  origin: "*",
  // origin: "http://localhost:8081",
  // origin: "http://100.25.182.245:8080",
};

app.use(cors(corsOptions));

// ! New Changes
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src https:; script-src https: 'unsafe-inline'; connect-src https:"
  );
  next();
});

// ! End of new Changes

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

/*
const cred = {
  key,
  cert
}
*/

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

//const httpsServer = https.createServer(cred,app)
//httpsServer.listen(8443)

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
