const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const db = require("../models");

router.get("/join", csrfProtection, (req, res) => {
  res.render("account/join", { csrfToken: req.csrfToken() });
});

router.post("/join", csrfProtection, async (req, res) => {
  db.Users.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    division: req.body.division
  }).then(() => {
    res.redirect("/");
  });
});

module.exports = router;
