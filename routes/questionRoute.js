const express = require("express")
const router = express.Router()
const dbConnection = require("../db/dbConfing")
const { StatusCodes } = require("http-status-codes")
// const authMiddleware = require("../middleWare/authMiddleware")
// requesting all questions
router.get("/all-questions",async (req,res) => {
    try {
        const [questions] = await dbConnection.query("SELECT id, questionid, title, description, tag FROM questions ORDER BY id DESC")
        res.status(StatusCodes.OK).json({questions:questions})
        // console.log(questions[0].title)
    } catch (error) {
        console.log(error.message)
    }
    
})
router.get("/single-question",async (req,res) => {
    try {
        const {questionid,title,description,tag} = req.body
        console.log(req.body)
        console.log([title])
        const [question] = await dbConnection.query("SELECT questionid, title, description, tag FROM questions WHERE questionid = ? AND title = ? AND description = ? AND tag = ?", [questionid, title, description, tag])
        res.status(StatusCodes.OK).json({question:question})
        // const result = question[0][0].title
        // console.log((result))
    } catch (error) {
        console.log(error.message)
    }
})

// asking a question
router.post("/ask",async (req,res) => {
    // *****filter it
    const {questionid,title,description,tag} = req.body
    if (!questionid || !title || !description) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please fill all the required fields."})
    }
    try {
        const {questionid,title,description,tag} = req.body
        const {userid} = req.user
        await dbConnection.query("INSERT INTO questions(questionid,userid,title,description,tag) VALUES (?,?,?,?,?)",[questionid,userid,title,description,tag])
        res.status(StatusCodes.OK).json({msg:"You posted your question"})
    } catch (error) {
        console.log(error.message)
    }
    
})
module.exports = router