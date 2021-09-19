const path = require("path");
const Walker = require("../models/Walker");

const walkersControllers = {
  home: (req, res) => {
    res.render("index", {
      title: "Home",
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      photo: req.session.imgUrl,
      _id: req.session._id,
      profilePhoto: req.session.profileImgurl,
    });
  },

  walkers: async (req, res) => {
    const walkers = await Walker.find();
    res.render("walkers", {
      title: "Paseadores",
      walkers,
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      photo: req.session.imgUrl,
      _id: req.session._id,
      profilePhoto: req.session.profileImgurl,
    });
  },
  newWalker: (req, res) => {
    res.render("newWalker", {
      title: "Ingresar",
      error: null,
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      photo: req.session.imgUrl,
      _id: req.session._id,
      profilePhoto: req.session.profileImgurl,
    });
  },
  walkerProfile: (req, res) => {
    res.render("profile", {
      title: "Perfil",
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      photo: req.session.imgUrl,
      _id: req.session._id,
      profilePhoto: req.session.profileImgurl,
      area: req.session.area,
      description: req.session.description,
      phoneNumber: req.session.phoneNumber,
      error: null,
      edit: false,
    });
  },
};

module.exports = walkersControllers;
