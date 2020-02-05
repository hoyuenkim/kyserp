const router = require("express").Router();
const db = require("../models");
const loginRequired = require("../libs/loginRequired");

router.get("/", loginRequired, async (req, res) => {
  let page = 0;
  if (req.query.page) page = req.query.page;
  const count = await db.Company.count();
  const maxPage = count / process.env.LIMIT;
});

modules.exports = router;
