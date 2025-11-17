const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
validate.classRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .matches(/^[A-Za-z]+$/)
      .withMessage("Only letters are allowed, no spaces.")
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkClassData = async (req, res, next) => {
  const { clasification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      clasification_name,
    })
    return
  }
  next()
}

validate.invRules = () => {
  return [
    body("classification_id")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Classification is required."),
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Make is required."),
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Model is required."),
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Description is required."),
    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Image URL is required."),
    body("inv_thumbnail")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Thumbnail URL is required."),
    body("inv_price")
      .trim()
      .escape()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),
    body("inv_year")
      .trim()
      .escape()
      .isInt({ min: 1886, max: new Date().getFullYear() + 1 })
      .withMessage(`Year must be between 1886 and ${new Date().getFullYear() + 1}.`),
    body("inv_miles")
      .trim()
      .escape()
      .isFloat({ min: 0 })
      .withMessage("Miles must be a positive number."),
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .matches(/^[A-Za-z]+$/)
      .withMessage("Color is required and must contain only letters."),
  ];
};

validate.checkInvData = async (req, res, next) => {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Inventory",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    })
    return
  }
  next()
}

module.exports = validate