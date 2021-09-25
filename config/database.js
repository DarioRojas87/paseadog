const Sequelize = require("sequelize");
const db = new Sequelize("paseadog", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
