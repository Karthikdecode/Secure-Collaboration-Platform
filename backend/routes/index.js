var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

const usercontroller = require("../controllers/usercontroller");

router.use(bodyParser.json());

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.Login);   
router.post("/sendotp", usercontroller.sendOtp);  
router.post("/verifyotp", usercontroller.verifyOtp); 
router.post("/getonedetailsdashboard", usercontroller.get1detailsdashboard); 
router.post("/saveMessage", usercontroller.saveMessage); 
router.post("/getMessages", usercontroller.getMessages);
router.get("/all-users", usercontroller.getAllUsers);

module.exports = router;
