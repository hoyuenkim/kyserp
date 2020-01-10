const crypto = require('crypto');
require('dotenv').config();

module.exports = (codeKey) => {
	const cipher = crypto.createCipher('aes-256-cbc', process.env.SALT);
	let result = cipher.update(codeKey, 'utf8', 'base64');
	result += cipher.final('base64');

	return result;
};
