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
			},
			async (username, password, done) => {
				try {
					const user = await db.Users.findOne({
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
					if (user.verify === false) {
						return done(null, false, { falseMessage: `메일인증을 해주세요` });
					}
					return done(null, user);
				} catch (e) {
					console.error(e);
				}
			}
		)
	);
};
