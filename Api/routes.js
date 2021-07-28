const express = require("express");
const db = require("../config/database");
const Product = require("../Models/product");
const Category = require("../Models/category");

const router = express.Router();

router.get("/categories", (req, res) => {
  Category.findAll()
    .then((Categories) => {
      res.json(Categories);
    })
    .catch((err) => console.log(err));
});
router.post("/products", (req, res) => {
  let categoryId = req.body.value;
  Product.findAll({
    where: {
      categoryId,
    },
  })
    .then((Products) => {
      res.json(Products);
    })
    .catch((err) => console.log(err));
});
router.post("/addproduct", (req, res) => {
  let { name, description } = req.body.inputs;
  let { id } = req.body;

  Product.create({
    title: name,
    description,
    categoryId: id,
  })
    .then((productRes) => res.json(productRes))
    .catch((err) => console.log(err));
});

router.post("/addcategory", (req, res) => {
  let { createCategory } = req.body;
  Category.create({
    title: createCategory,
  })
    .then((productRes) => res.json(productRes))
    .catch((err) => console.log(err));
});

router.post("/deleteItem", (req, res) => {
  let { id } = req.body;

  Product.destroy({
    where: {
      id,
    },
  }).then(() => res.end());
});

router.post("/updateItem", (req, res) => {
  let { id, title, description } = req.body.data;

  Product.findOne({ where: { id } }).then((rec) => {
    rec
      .update({
        title,
        description,
      })
      .then(() => res.end());
  });
});

router.post("/updateCategory", (req, res) => {
  let { id, title } = req.body;
  Category.findOne({ where: { id } }).then((rec) => {
    rec
      .update({
        title,
      })
      .then(() => res.end());
  });
});

router.post("/deleteCategory", (req, res) => {
  let { id } = req.body;

  Category.destroy({
    where: {
      id,
    },
  }).then(() => res.end());
});

module.exports = router;
