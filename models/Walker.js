const Sequelize = require("sequelize");
const db = require("../config/database");

const Walker = db.define("walker", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  area: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profileImgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Walker;
