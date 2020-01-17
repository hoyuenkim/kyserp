const crypto = require("crypto");
require("dotenv").config();

module.exports = codeKey => {
  const decipher = crypto.createDecipher("aes-256-cbc", process.env.SALT);
  let result2 = decipher.update(codeKey, "base64", "utf8");
  result2 += decipher.final("utf8");

  return result2;
};
