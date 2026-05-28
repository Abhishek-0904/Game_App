const express = require("express");
const { registerUser, loginUser } = require("../controllers/user");
const { getBankdetails, addbankdetails, updateBankDetails } = require("../controllers/bank");
const { getUpiDetails, addUpiDetails, updateUpiDetails } = require("../controllers/upi");
const { getuser, adduser, updateuser } = require("../controllers/user_wallet");
const { getWalletTypes } = require("../controllers/wallet_type");
const { getuser_wallet_status, adduser_wallet_status, updateuser_wallet_status } = require("../controllers/user_wallet_status");
const { getuser_wallet_history, adduser_wallet_history } = require("../controllers/wallet_history");

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

// Wallet Type Routes
router.get("/wallet-types", getWalletTypes);

// User Wallet Routes
router.get("/user_wallet", getuser);
router.post("/user_wallet", adduser);
router.put("/user_wallet", updateuser);

// User Wallet Status Routes
router.get("/user_wallet_status", getuser_wallet_status);
router.post("/user_wallet_status", adduser_wallet_status);
router.put("/user_wallet_status", updateuser_wallet_status);

// User Wallet History Routes
router.get("/user_wallet_history", getuser_wallet_history);
router.post("/user_wallet_history", adduser_wallet_history);

module.exports = router;
