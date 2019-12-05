const passport = require("passport");
const db = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    const user = db.User.findOne({
      where: {
        id: user.id
      },
      attributes: {
        exclude: ["password"]
      }
    });
    done(null, user);
  });

  local();
};
