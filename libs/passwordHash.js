const crypto = require("crypto");
require("dotenv").config();
const salt = process.env.SALT;

module.exports = password => {
  return crypto
    .createHash("sha512")
    .update(password, salt)
    .digest("base64");
};
