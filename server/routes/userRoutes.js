const express = require("express")
const router = express.Router()

const {
  login,
  signUP,
} = require("../controllers/authentication")

router.post("/login", login)
router.post("/signup", signUP)

module.exports = router