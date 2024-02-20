const mysql2 = require("mysql2");
const dotenv = require("dotenv")
dotenv.config()
const dbConnection = mysql2.createPool({
    user:"evangadi_admin",
    database:"evangadi-forem",
    host:"localhost",
    password:`${process.env.PASSWORD}`,
    connectionLimit:10
})
// dbConnection.execute("SELECT 'test'",(error,result) => {
//     if(error) {
//         console.log(error.message)
//     } else {
//         console.log(result)
//     }
// })
module.exports = dbConnection.promise()