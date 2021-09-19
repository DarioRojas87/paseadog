const Walker = require("../models/Walker");

const userControllers = {
  addWalker: async (req, res) => {
    console.log(req.body);
    const {
      name,
      email,
      password,
      area,
      imgUrl,
      description,
      profileImgUrl,
      phoneNumber,
      _id,
    } = req.body;

    let newWalker;
    if (!_id) {
      newWalker = new Walker({
        name,
        email,
        password,
        area,
        imgUrl,
        description,
        profileImgUrl,
        phoneNumber,
      });
    } else {
      console.log("entra al findOne");
      newWalker = await Walker.findOne({ _id });
      newWalker.area = area;
      newWalker.imgUrl = imgUrl;
      newWalker.profileImgUrl = profileImgUrl;
      newWalker.phoneNumber = phoneNumber;
      newWalker.description = description;
      req.session.imgUrl = imgUrl;
      req.session.area = area;
      req.session.description = description;
      req.session.profileImgurl = profileImgUrl;
      req.session.phoneNumber = phoneNumber;
    }
    try {
      await newWalker.save();
      res.redirect("/walkers");
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
  updateWalker: async (req, res) => {
    let updatedWalker = await Walker.findOne({ _id: req.params.walkerId });

    try {
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
        edit: true,
      });
    } catch (err) {
      console.log(err);
    }

    // res.render("profile", {
    //   title: "Perfil",
    //   loggedIn: req.session.loggedIn,
    //   name: req.session.name,
    //   photo: req.session.imgUrl,
    //   _id: req.session._id,
    //   profilePhoto: req.session.profileImgurl,
    //   area: req.session.area,
    //   description: req.session.description,
    //   error: null,
    //   edit: true,
    // });
  },
};

module.exports = userControllers;
