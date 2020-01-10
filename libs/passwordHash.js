<<<<<<< HEAD
const crypto = require("crypto");
require("dotenv").config();
const salt = process.env.SALT;

module.exports = password => {
  return crypto
    .createHash("sha512")
    .update(password, salt)
    .digest("base64");
};
=======
const crypto = require("crypto");
require("dotenv").config();
const salt = process.env.SALT;

module.exports = password => {
  return crypto
    .createHash("sha512")
    .update(password, salt)
    .digest("base64");
};
>>>>>>> b25a21503f005cc94ce9d89228759f3b6211a0a1
