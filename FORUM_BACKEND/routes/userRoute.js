const express = require("express")
const router = express.Router()
// authorization middleware
const authMiddleware = require("../middleWare/authMiddleware")
// importing controllers
const {register,login,checkUser} = require("../controller/userController")

router.post("/register",register)

router.post("/login",login)
router.get("/check",authMiddleware,checkUser)

// export
module.exports = router