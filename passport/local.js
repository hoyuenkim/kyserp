const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const passwordHash = require("../libs/passwordHash");

module.exports = () => {
  passport.use(
    new LocalStrategy({
      usernameField: "username",
      passwordField: "password"
    }),
    async (username, password, done) => {
      const user = await db.models.fineOne({
        where: {
          username
        }
      });
      if (!user) {
        done(null, false, { falseMessage: `존재하지 않는 아이디 입니다` });
      }
      if (user.password != passwordHash(password)) {
        done(null, false, { falseMessage: `비밀번호가 틀립니다` });
      }
      done(null, user);
    }
  );
};
