// Needed Resources 
const { Router } = require("express")
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

const router = new Router() 

router.get("/login", utilities.handleErrors(accountController.buildLogin))

router.get("/register", utilities.handleErrors(accountController.buildRegister))
router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router;