const { body } = require("express-validator");

const validateBook = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required"),

  body("category")
  .trim()
  .notEmpty()
  .withMessage("Category is required"),
  
  body("condition")
    .trim()
    .notEmpty()
    .withMessage("Condition is required"),
];

module.exports = {
  validateBook,
};