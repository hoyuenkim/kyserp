const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const db = require("../models");
const passport = require("passport");
const nodemailer = require("nodemailer");
const passwordHash = require("../libs/passwordHash");
const codeHash = require("../libs/codeHash");
const codeUnhash = require("../libs/codeUnhash");
require("dotenv").config();

router.get("/join", csrfProtection, (req, res) => {
  res.render("accounts/join", { csrfToken: req.csrfToken() });
});

router.post("/join", csrfProtection, async (req, res) => {
  const email = req.body.username;
  const emailUrl = await email.split(`@`);
  let authority = "client";
  if (emailUrl[1] === "kysco.kr" && emailUrl[0] === "admin") {
    authority = `admin`;
  }
  if (emailUrl[1] === "kysco.kr" && username != "admin") {
    authority = `kys`;
  }
  db.Users.create({
    username: email,
    password: passwordHash(req.body.password),
    name: req.body.name,
    phone: req.body.phone,
    authority: authority,
    verify: false
  })
    .then(() => {
      const email = req.body.username;
      const url = codeHash(email).replace("/", "?");
      console.log(url);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_ID,
          pass: process.env.GOOGLE_PASSWORD
        }
      });
      const mailOptions = {
        from: "kys@kysco.kr",
        to: req.body.username,
        subject: "다산카이스 서비스 가입 확인 메일",
        text: `
				  안녕하세요. 다산카이스입니다.

				  ${req.body.name}님의 가입확인 메일입니다.

				  아래 url을 클릭하셔서 회원가입 인증을 하시는 것을 요청드립니다.
				  http://${process.env.DOMAIN}/accounts/verify/${url}
				`
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);
        console.log("email sent : " + info.response);
      });
    })
    .catch(err => {
      if (err) console.error(err);
      res.status(500).send(e);
    })
    .then(() => {
      res.redirect(`/`);
    });
});

router.get("/verify/:url", async (req, res) => {
  const url = req.params.url.replace("?", "/");
  const username = codeUnhash(url);
  db.Users.update(
    {
      verify: true
    },
    {
      where: {
        username
      }
    }
  )
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      if (err) console.error(err);
    });
});

router.get("/login", (req, res) => {
  res.redirect("/");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: true
  }),
  (req, res) => {
    res.redirect("/main");
  }
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
