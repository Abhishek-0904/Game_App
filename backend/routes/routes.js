const express = require("express");
const { registerUser, loginUser } = require("../controllers/user");
const { getBankdetails, addbankdetails } = require("../controllers/bank");
const { getUpiDetails, addUpiDetails } = require("../controllers/upi");

const router = express.Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Bank Routes
router.get("/bank", getBankdetails);
router.post("/bank", addbankdetails);

// UPI Routes
router.get("/upi", getUpiDetails);
router.post("/upi", addUpiDetails);

module.exports = router;



