const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleWare/authMiddleware")
const { StatusCodes } = require("http-status-codes")
const dbConnection = require("../db/dbConfing")
// getting answer for single question
router.get("/all-answers/:questionid",async (req,res) => {
   try {
    const [answers] = await dbConnection.query("SELECT answer,answered_at from answers ORDER BY answerid")
    // console.log(answers[0])
    res.status(StatusCodes.OK).json({answers:answers})
   } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong, Please try again!"})
   } 
})
router.post("/answer/:questionid",async (req, res) => {
    // filtering based on the input
    const {answer} = req.body
    if (!answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please fill all required fields"})
    }
    try {
        const {userid} = req.user
        const {answer} = req.body
        const questionid = req.params.questionid
        // console.log(req.body)
        await dbConnection.query("INSERT INTO answers(userid,questionid,answer) VALUES (?,?,?) ",[userid,questionid,answer])
        res.status(StatusCodes.OK).json({msg:"You answered successfully"})
    } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong, please try again later"}) 
    }
    
})

module.exports = router