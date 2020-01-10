<<<<<<< HEAD
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require('../models');

const passwordHash = require('../libs/passwordHash');

module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password'
				// passReqToCallback: true
			},
			async (username, password, done) => {
				try {
					const user = await db.models.fineOne({
						where: {
							username
						}
					});
					if (!user) {
						return done(null, false, { falseMessage: `존재하지 않는 아이디 입니다` });
					}
					if (user.password != passwordHash(password)) {
						return done(null, false, { falseMessage: `비밀번호가 틀립니다` });
					}
					return done(null, user);
				} catch (e) {
					console.error(e);
				}
			}
		)
	);
};
=======
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
>>>>>>> b25a21503f005cc94ce9d89228759f3b6211a0a1
