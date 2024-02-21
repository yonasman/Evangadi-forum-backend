const express = require("express")
const router = express.Router()

router.get("/all-answers",(req,res) => {
    res.send("all answers")
})
router.post("/answer",(req, res) => {
    res.send("you can answer")
})

module.exports = router