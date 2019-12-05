const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const db = require("./models");

const app = express();
const port = process.env.PORT;

nunjucks.configure("templates", {
  autoescape: true,
  express: app,
  watch: true
});

dotenv.config();
db.sequelize.sync();

app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_PASSWORD));
app.use(
  session({
    secret: process.env.COOKIE_PASSWORD,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 2000 * 60 * 60
    }
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("libs"));
app.use(express.static("public"));

app.use((req, res, next) => {
  app.locals.userData = req.user;

  next();
});

app.get("/", (req, res) => {
  res.render("/accounts/login");
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1${port}`);
});
