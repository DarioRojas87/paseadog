const express = require("express");
const router = require("./routes/index");
const session = require("express-session");
const mongo = require("connect-mongodb-session")(session);
require("dotenv").config();

const myStore = new mongo({
  uri: process.env.MONGODB,
  collection: "sessions",
});

require("./config/database");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.FRASE,
    resave: false,
    saveUninitialized: false,
    store: myStore,
  })
);

app.use("/", router);

app.listen(4000, () => console.log("Server up and running in port 4000"));