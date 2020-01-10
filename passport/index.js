const passport = require('passport');
const db = require('../models');
const local = require('./local');
module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser(async (user, done) => {
		try {
			const user = await db.User.findOne({
				where: {
					id: user.id
				},
				attributes: {
					exclude: [ 'password' ]
				}
			});
			return done(null, user);
		} catch (e) {
			console.error(e);
		}
	});
	local();
};
