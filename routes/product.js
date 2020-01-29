const router = require("express").Router();
const loginRequired = require("../libs/loginRequired");
const db = require("../models");
const op = require("sequelize");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const uploadDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    callback(null, `product_${Date.now()}_${file.mimetype.split("/")[1]}`);
  }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  let page = 1;
  page = req.query.page;
  const count = await db.Product.count();
  // const maxPage = Math.ceil(count / process.env.LIMIT) + 1;
  const maxPage = 10;
  const urlQuery = req._parsedUrl.query;
  // const search = createSearch(req.query).findContent;
  // const productList = await db.Product.findAll({
  // 	where: search,
  // 	offset: page * process.env.LIMIT,
  // 	limit: process.env.LIMIT
  // });
  console.log(urlQuery);
  const productList = [
    { name: "DKC3102S", section: "원패스", price: 10, cost: 10 },
    { name: "DKC3102S", section: "원패스", price: 10, cost: 10 },
    { name: "DKC3102S", section: "원패스", price: 10, cost: 10 }
  ];
  res.render("product/home", { productList, page, maxPage, urlQuery });
});

router.get("/regist", loginRequired, (req, res) => {
  res.render("product/regist");
});

router.post("/regist", loginRequired, upload.single("thumbnail"), async (req, res) => {
  try {
    const product = await db.Product.create({
      name: req.body.name,
      section: req.body.section,
      thumbnail: req.file ? req.file.filename : "",
      price: req.body.price,
      cost: req.body.cost
    });
    const stock = db.Stock.create({
      productId: product.id,
      quantity: req.body.quantity,
      status: true
    });
    res.redirect("/product");
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/order", loginRequired, async (req, res) => {
  res.render("product/order");
});

router.post("/order", loginRequired, async (req, res) => {});

const createSearch = queries => {
  let findContent = {};
  if (queries.searchType && queries.searchText && queries.searchText.length >= 1) {
    let searchTypes = queries.searchType.toLowerCase().split(",");
    let postQueries = [];
    searchTypes.forEach(type => {
      if (searchTypes.indexOf(type) >= 0) {
        postQueries[type] = { $like: `%${queries.searchText}%` };
      }
    });
    if (postQueries.length > 0) findContent = { $or: postQueries };
  }
  return {
    searchType: queries.searchType,
    searchText: queries.searchText,
    findContent: findContent
  };
};

module.exports = router;
