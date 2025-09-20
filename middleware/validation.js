const { body, validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");

const validateMongoId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Id format' });
  }
  return next();
};

function validateContact(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    return next();
}

const contactValidationRules = [
    body("firstName").isString().notEmpty().isLength({min: 3, max: 15}).withMessage("First name is required and between 3 and 15 characters"),
    body("lastname").isString().notEmpty().isLength({min: 3, max: 15}).withMessage("Last name is required and between 3 and 15 characters"),
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("favoriteColor").isString().notEmpty().isLength({min: 1, max: 15}).withMessage("Favorite Color is required"),
    body("birthday").notEmpty()
    .isISO8601()
    .isBefore(new Date().toISOString().split('T')[0])
    .withMessage("Birthday is required")
];

const updateContactValidationRules = [
  body('firstName')
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastname')
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('favoriteColor')
    .optional()
    .isString()
    .withMessage('Favorite color must be a string'),
  body('birthday')
    .optional()
    .isISO8601()
    .isBefore(new Date().toISOString().split('T')[0])
    .withMessage('Birthday must be a valid date in the past'),
];


module.exports = { validateContact, contactValidationRules, updateContactValidationRules, validateMongoId }