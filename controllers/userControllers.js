const Walker = require("../models/Walker");

const userControllers = {
  addWalker: async (req, res) => {
    const {
      name,
      email,
      password,
      area,
      imgUrl,
      description,
      profileImgUrl,
      phoneNumber,
    } = req.body;
    try {
      let newWalker = new Walker({
        name,
        email,
        password,
        area,
        imgUrl,
        description,
        profileImgUrl,
        phoneNumber,
      });
      await newWalker.save();
      res.redirect("/");
    } catch (err) {
      res.render("newWalker", {
        title: "Ingresar",
        error: err,
      });
    }
  },
  logWalker: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await Walker.findOne({ email });
      if (user.password === password) {
        console.log(user);
        req.session.loggedIn = true;
        req.session.name = user.name;
        req.session.imgUrl = user.imgUrl;
        req.session.area = user.area;
        req.session.description = user.description;
        req.session._id = user._id;
        req.session.email = user.email;
        req.session.profileImgurl = user.profileImgUrl;
        req.session.phoneNumber = user.phoneNumber;
        res.redirect("/walkers");
      }
    } catch (err) {
      res.render("newWalker", {
        title: "Ingresar",
        error: "Datos invalidos, intente de nuevo",
        loggedIn: false,
      });
    }
  },
  signOutWalker: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  },

  deleteWalker: async (req, res) => {
    console.log("entra al delete");
    await Walker.findOneAndDelete({ _id: req.params.walkerId });
    req.session.destroy(() => {
      res.redirect("/");
    });
  },
  updateWalker: async (req, res) => {},
};

module.exports = userControllers;
