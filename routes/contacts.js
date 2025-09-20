const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");
const { validateContact, contactValidationRules, validateMongoId, updateContactValidationRules} = require("../middleware/validation");

router.get("/", contactsController.getAll);
router.get("/:id", validateMongoId, contactsController.getSingle);
router.post("/", contactValidationRules, validateContact, contactsController.createContact);
router.put("/:id", validateMongoId, updateContactValidationRules, validateContact, contactsController.updateContact);
router.delete("/:id", validateMongoId, contactsController.deleteContact);

module.exports = router;