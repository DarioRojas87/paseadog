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
  updateWalker: async (req, res) => {
    console.log("entra a updateWalker");
    console.log(req);
    let updatedWalker = await Walker.findOne({ _id: req.params.walkerId });
    console.log(updatedWalker, "es el updated walker");
    console.log(updatedWalker._id);
    try {
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
      //   edit: null,
      // });
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
