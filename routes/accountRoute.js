// Needed Resources 
const { Router } = require("express")
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

const router = new Router() 

// Route to build inventory by classification view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

module.exports = router;