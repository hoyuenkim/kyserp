const passport = require("passport");
const db = require("../models");
const local = require("./local");
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.Users.findOne({
        where: {
          id
        },
        attributes: {
          exclude: ["password"]
        }
      });
      return done(null, user);
    } catch (e) {
      console.error(e);
    }
  });
  local();
};
