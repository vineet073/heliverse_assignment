const express = require("express")
const router = express.Router();

const {isAuthorized,isStudent,isAdmin,isInstructor}=require('../middlewares/authorization');
const {capturePayment,verifyPayment,sendPaymentSuccessfulMail}=require('../controllers/Payment');


router.post("/capturePayment",isAuthorized, isStudent, capturePayment);
router.post("/verifyPayment",isAuthorized, isStudent, verifyPayment);
router.post("/sendPaymentSuccessfulEmail", isAuthorized, isStudent, sendPaymentSuccessfulMail);

module.exports = router;