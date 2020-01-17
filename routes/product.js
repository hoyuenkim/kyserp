const router = require("express").Router();
const loginRequired = require("../libs/loginRequired");
const db = require("../models");

router.get("/", loginRequired, async (req, res) => {
  const productList = await db.Product.find();
});

module.exports = router;
