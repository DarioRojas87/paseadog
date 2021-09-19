const mongoose = require("mongoose");

const walkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  area: { type: String, required: true },
  imgUrl: { type: String, required: true },
  profileImgUrl: { type: String, required: true },
  description: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const Walker = mongoose.model("walker", walkerSchema);

module.exports = Walker;
