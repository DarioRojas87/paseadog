const Walker = require("../models/Walker");

const walkersControllers = {
  home: async (req, res) => {
    const walkers = await Walker.findAll({ raw: true });
    res.render("index", {
      title: "Home",
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      photo: req.session.imgUrl,
      id: req.session.userid,
      profilePhoto: req.session.profileImgurl,
      walkers,
    });
  },

  walkers: async (req, res) => {
    const walkers = await Walker.findAll({ raw: true });
    res.render("walkers", {
      title: "Paseadores",
      walkers,
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      photo: req.session.imgUrl,
      id: req.session.userid,
      profilePhoto: req.session.profileImgurl,
      phoneNumber: req.session.phoneNumber,
    });
  },
  newWalker: (req, res) => {
    res.render("newWalker", {
      title: "Ingresar",
      error: null,
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      photo: req.session.imgUrl,
      id: req.session.userid,
      profilePhoto: req.session.profileImgurl,
    });
  },
  walkerProfile: (req, res) => {
    res.render("profile", {
      title: "Perfil",
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      photo: req.session.imgUrl,
      id: req.session.userid,
      profilePhoto: req.session.profileImgurl,
      area: req.session.area,
      description: req.session.description,
      phoneNumber: req.session.phoneNumber,
      error: null,
      edit: false,
    });
  },

  walkersFilter: async (req, res) => {
    if (req.body.area === "all") {
      const walkers = await Walker.findAll({ raw: true });
      res.render("walkers", {
        title: "Paseadores",
        walkers,
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        photo: req.session.imgUrl,
        id: req.session.userid,
        profilePhoto: req.session.profileImgurl,
      });
    } else {
      let walkers = await Walker.findAll({
        where: { area: req.body.area },
      });
      res.render("walkers", {
        title: "Paseadores",
        walkers,
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        photo: req.session.imgUrl,
        id: req.session.userid,
        profilePhoto: req.session.profileImgurl,
      });
    }
  },
};

module.exports = walkersControllers;
