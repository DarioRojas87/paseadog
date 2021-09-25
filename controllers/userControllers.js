const Walker = require("../models/Walker");
const bcryptjs = require("bcryptjs");

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
      id,
    } = req.body;

    try {
      if (!id) {
        let hashedPass = bcryptjs.hashSync(password);
        let walkerExist = await Walker.findOne({
          where: { email: email },
        });

        if (walkerExist) {
          throw new Error();
        }
        await Walker.create({
          name,
          email,
          password: hashedPass,
          area,
          imgUrl,
          description,
          profileImgUrl,
          phoneNumber,
        });
      } else {
        await Walker.update({ ...req.body }, { where: { id: req.body.id } });
        req.session.imgUrl = imgUrl;
        req.session.area = area;
        req.session.description = description;
        req.session.profileImgurl = profileImgUrl;
        req.session.phoneNumber = phoneNumber;
      }

      res.redirect("/walkers");
    } catch (err) {
      res.render("newWalker", {
        title: "Ingresar",
        error: err,
        loggedIn: req.session.loggedIn,
        name: req.session.name,
        photo: req.session.imgUrl,
        id: req.session.userid,
        profilePhoto: req.session.profileImgurl,
      });
    }
  },
  logWalker: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await Walker.findOne({
        where: { email: email },
      });
      if (!user) {
        throw new Error();
      }
      let passMatch = bcryptjs.compareSync(password, user.password);
      if (!passMatch) {
        throw new Error();
      } else {
        req.session.loggedIn = true;
        req.session.name = user.name;
        req.session.imgUrl = user.imgUrl;
        req.session.area = user.area;
        req.session.description = user.description;
        req.session.userid = user.id;
        req.session.email = user.email;
        req.session.profileImgurl = user.profileImgUrl;
        req.session.phoneNumber = user.phoneNumber;
        res.redirect("/");
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
    let walkerToDelete = await Walker.findByPk(req.params.walkerId);
    await walkerToDelete.destroy();
    req.session.destroy(() => {
      res.redirect("/");
    });
  },
  updateWalker: async (req, res) => {
    try {
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
        edit: true,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userControllers;
