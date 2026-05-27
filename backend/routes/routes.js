const express = require("express");
const { registerUser, loginUser } = require("../controllers/user");
const { getBankdetails, addbankdetails, updateBankDetails } = require("../controllers/bank");
const { getUpiDetails, addUpiDetails, updateUpiDetails } = require("../controllers/upi");

const router = express.Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Bank Routes
router.get("/bank", getBankdetails);
router.post("/bank", addbankdetails);
router.put("/bank", updateBankDetails);

// UPI Routes
router.get("/upi", getUpiDetails);
router.post("/upi", addUpiDetails);
router.put("/upi", updateUpiDetails);

module.exports = router;



