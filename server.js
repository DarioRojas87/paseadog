const express = require("express");
const router = require("./routes/index");
const session = require("express-session");
require("dotenv").config();
const db = require("./config/database");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const myStore = new SequelizeStore({
  db: db,
});

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
    proxy: true,
    db: db,
  })
);
myStore.sync();
db.sync().then(() => {
  app.use("/", router);
  app.listen(4000, () => console.log("Server up and running in port 4000"));
});
