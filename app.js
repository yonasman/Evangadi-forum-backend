const express = require("express")
const app = express()
const dbConnection = require("./db/dbConfing")
const port = 5000
const authMiddleware = require("./middleWare/authMiddleware")
// using route middleware file
const userRoutes = require("./routes/userRoute")
app.use(express.json())
app.use("/api/users",userRoutes)

// Question
const questionRoutes = require("./routes/questionRoute")
app.use("/api/questions",authMiddleware,questionRoutes)
// answer
const answerRoutes = require("./routes/answerRoute")
app.use("/api/answers",authMiddleware,answerRoutes)
app.use("/api/answer",authMiddleware,answerRoutes)

// db connection
async function start() {
    try {
    //    const result = await dbConnection.execute("select 'test'")
    //    console.log(result)
        app.listen(port)
        console.log("connection established with db")
        console.log(`listening to ${port}`)
    } catch (error) {
        console.log(error.message)
    }
}
start()
