const express = require("express")
const app = express()
const dbConnection = require("./db/dbConfing")
const port = 5000
const authMiddleware = require("./middleWare/authMiddleware")
// using route middleware file
const userRoutes = require("./routes/userRoute")
app.use(express.json())
app.use("/api/users",userRoutes)
const questionRoutes = require("./routes/questionRoute")
// Question
app.use("/api/questions",authMiddleware,questionRoutes)


// db connection
async function start() {
    try {
       const result = await dbConnection.execute("select 'test'")
    //    console.log(result)
        app.listen(port)
        console.log("connection established with db")
        console.log(`listening to ${port}`)
    } catch (error) {
        console.log(error.message)
    }
}
start()
