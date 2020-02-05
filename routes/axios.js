const router = require("express").Router();
const db = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.post("/user/find/one", async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: {
        username: req.body.username
      }
    });
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.post("/product/find/one", (req, res) => {
  db.Product.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(product => {
      res.status(200).json(product);
    })
    .catch(e => {
      console.error(e);
      res.status(404).send(e);
    });
});

router.post("/product/find/all", async (req, res) => {
  try {
    const productList = await db.Product.findAll({
      where: {
        name: { [Op.like]: "%" + req.body.name + "%" }
      }
    });
    res.status(200).json(productList);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/company/find/all", async (req, res) => {
  try {
    const companyList = await db.Company.findAll({
      where: {
        name: { [Op.like]: "%" + req.body.company + "%" }
      }
    });
    res.status(200).json(companyList);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
