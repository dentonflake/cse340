// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require('../utilities/inventory-validation')

router.get(
  "/",
  utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(invController.buildManagement)
);

router.get(
  "/add-classification",
  utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(invController.buildAddClassification)
);

router.post(
  "/add-classification",
  utilities.requireEmployeeOrAdmin,
  invValidate.classRules(),
  invValidate.checkClassData,
  utilities.handleErrors(invController.addClassification)
);

router.get(
  "/add-inventory",
  utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(invController.buildAddInventory)
);

router.post(
  "/add-inventory",
  utilities.requireEmployeeOrAdmin,
  invValidate.invRules(),
  invValidate.checkInvData,
  utilities.handleErrors(invController.addInventory)
);

router.get(
  "/type/:classificationId",
  utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(invController.buildByClassificationId)
);

router.get(
  "/detail/:inventoryId",
  utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(invController.buildByInventoryId)
);

router.get(
  "/getInventory/:classification_id",
  utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(invController.getInventoryJSON)
)

router.get(
  "/edit/:inv_id",
  utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(invController.editInventoryView)
)

router.post(
  "/update/",
  invValidate.invRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

router.get(
  "/stats",
  utilities.requireEmployeeOrAdmin,
  utilities.handleErrors(invController.buildStats)
)

module.exports = router;